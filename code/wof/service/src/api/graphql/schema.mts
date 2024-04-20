import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

import { getFilteredWheelParts } from "../data/disabledWheelValues.mjs";
import { getWheelValues, updateOrAddWheelValue } from "../data/getWheelValues.mjs";
import { sessionDisplaySettings } from "../data/sessionDisplaySettings.mjs";
import { DisplaySettingsInput, UpdateWheelPartInput, WheelPartFilter, WheelSettingsInput } from "../generated-types/graphql.mjs";
import { displaySettingsInputType } from "./types/displaySettingsInputType.mjs";
import { displaySettingsType } from "./types/displaySettingsType.mjs";
import { gameSettingsType, getChanceToWin, getSumOfLooseChance, getSumOfWinChance } from "./types/gameSettingsType.mjs";
import { updateWheelPartInputType, wheelPartType } from "./types/wheelPartType.mjs";
import { wheelSettingsInputType } from "./types/wheelSettingsInputType.mjs";
import { wheelSettingsType } from "./types/wheelSettingsType.mjs";
import { PubSub } from 'graphql-subscriptions';
import { getDisplaySettingsRepo } from "../../data/DisplaySettingsRepo.mjs";
import { Game, getGameRepo } from "../../data/GameRepo.mjs";
import { getWheelSettingsRepo } from "../../data/WheelSettingsRepo.mjs";
import { getWheelValuesRepo } from "../../data/WheelValuesRepo.mjs";
import { CHECK_CHANCE } from "../data/constants/WIN_CHANCE";
import { WheelValue } from "../data/types/WheelValue.mjs";

const games: GameResult[] = []

export type GameResult = {
  result: WheelValue;
  resultId: number;
  date: string;
};

export async function getGame() {
  const repo = await (getGameRepo());
  const result = await repo.findOne({ where: { id: 1 } })
  return result;
}


function isWinner(winChance: number) {
  if (winChance > 1) {
    console.error("Chance of winning must be between 0 and 1");
  }
  const randomResult = Math.random();

  return randomResult < winChance;
}

function getWinner<T extends WheelValue>(sumOfChances: number, values: T[]) {
  if (values.length === 0) {
    console.error("NO values to be found.");
  }
  const randomResult = Math.random() * sumOfChances;

  let currentChance = 0;
  for (const value of values) {
    currentChance += value.winChance;
    if (currentChance > randomResult) {
      return value;
    }
  }

  return values[values.length - 1];
}

async function calculateWinner() {

  const winChance = await getChanceToWin();
  const sumOfLooseChance = await getSumOfLooseChance();
  const sumOfWinChance = await getSumOfWinChance();
  console.log("Calculate winner with chance", winChance);
  const winner = isWinner(winChance);

  if (CHECK_CHANCE) {
    let won = 0;
    let lost = 0;
    for (let i = 0; i < 1000000; i++) {
      if (isWinner(winChance)) {
        won++;
      } else {
        lost++;
      }
    }
    console.log("Checked chance", {
      won,
      lost,
      all: won + lost,
      winChance,
      actual: won / (won + lost),
    });
  }

  const values = await getFilteredWheelParts({ disabled: false });
  if (winner) {
    //WON!
    const winOptions = values.filter((value) => value.win);
    console.log({ values, winOptions })
    const winOffset = getWinner(sumOfWinChance, winOptions);
    const winIndex = values.indexOf(winOffset);
    return { index: winIndex, result: values[winIndex] }
  } else {
    // LOST!
    const lostOptions = values.filter((value) => !value.win);
    console.log({ values, lostOptions })
    const lostOffset = getWinner(sumOfLooseChance, lostOptions);
    const lostIndex = values.indexOf(lostOffset);
    return { index: lostIndex, result: values[lostIndex] }
  }
}
const dateType = new GraphQLScalarType<string, string>({ name: "Date" });

export const gameType = new GraphQLObjectType({
  name: "Game",
  fields: {
    isRunning: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    isRoundDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    lastUpdate: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    canToggle: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    date: {
      type: new GraphQLNonNull(dateType),
    },
    resultId: {
      type: GraphQLID,
    },

  },
});
export const gameResultType = new GraphQLObjectType({
  name: "GameResult",
  fields: {
    result: {
      type: wheelPartType,
    },
    date: {
      type: dateType,
    },
  },
});


const pubsub = new PubSub();

async function verifyToggleable<T extends Game>(g: T) {
  if(!g.canToggle){
    throw new Error(`Please wait a sec... ;)`)
  }
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS
  const now = performance.now();
  const diff = g.lastUpdate + minClickDelay - now;
  if (diff > 0) {
    throw new Error(`Wait for additional ${diff}ms`)
  }
  return now;
}

async function startGame(now: number) {
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS

  const g = await getGame();

  await g.update({
    isRunning: true,
    lastUpdate: now,
    isRoundDone: false,
    resultId: null,
    canToggle: false,
  });

  pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });

  setTimeout(async () => {
    const g = await getGame();
    await g.update({
      canToggle: true,
    });
    pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
  },
    minClickDelay
  )
  return (await getGame()).dataValues;
}
async function stopGame<T extends Game>(now: number) {
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS

  const g = await getGame();
  const result = await calculateWinner();
  games.push({ ...result, resultId: result.result.id, date: new Date(Date.now()).toISOString() })
  await g.update({
    isRunning: false,
    lastUpdate: now,
    isRoundDone: false,
    resultId: result.result.id,
    canToggle: false,
  });
  pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });

  setTimeout(async () => {
    const g = await getGame();
    await g.update({
      isRoundDone: true,
    });
    pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
  }, sessionDisplaySettings.showResultAfterMS + sessionDisplaySettings.showResultForMS)

  setTimeout(async () => {
    const g = await getGame();
    await g.update({
      canToggle: true,
    });
    pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
  },
    minClickDelay
  )
  return (await getGame()).dataValues;
}

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      statistics: {
        type: new GraphQLObjectType({
          name: "Statistics",
          fields: {
            results: {
              type: new GraphQLList(new GraphQLNonNull(gameResultType)),
              resolve() {
                return games;
              }
            },
            games: {
              type: new GraphQLObjectType({
                name: "GameStatistics",
                fields: {
                  total: {
                    type: GraphQLInt,
                    resolve() {
                      return games.length;
                    }
                  },
                  won: {
                    type: GraphQLInt,
                    resolve() {
                      return games.filter(r => r.result.win).length;
                    }
                  },
                  loose: {
                    type: GraphQLInt,
                    resolve() {
                      return games.filter(r => !r.result.win).length;
                    }
                  }
                }
              }),
              resolve() { return {} }
            },
          },
        }),
        resolve() { return {} }

      },
      wheelParts: {
        type: new GraphQLList(new GraphQLNonNull(wheelPartType)),

        args: {
          ["filter"]: {
            type: new GraphQLInputObjectType({
              name: "wheelPartFilter",
              fields: {
                disabled: {
                  type: GraphQLBoolean,
                  description: "Set to true, to remove disabled items from result"
                },
              },
            }),
          },
        },

        async resolve(source, args, context, info) {
          const filter: WheelPartFilter = args["filter"];
          await new Promise<void>((r) => setTimeout(() => r(), 100));
          return !filter ? getWheelValues() : getFilteredWheelParts(filter);
        },
      },
      displaySettings: {
        type: displaySettingsType,

        async resolve() {
          const result = (await (await getDisplaySettingsRepo()).findOne({ where: { id: 1 } })).dataValues

          return result
        },
      },
      wheelSettings: {
        type: wheelSettingsType,

        async resolve() {
          const result = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues
          return result
        },
      },

      gameSettings: {
        type: gameSettingsType,
        resolve() {
          return {};
        },
      },

      game: {
        type: gameType,
        async resolve() {
          return (await getGame()).dataValues;
        },
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {

      startWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          return await startGame(await verifyToggleable((await getGame()).dataValues))
        },
      },

      stopWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          return await stopGame(await verifyToggleable((await getGame()).dataValues))
        },
      },

      toggleWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          const g = (await getGame()).dataValues;
          if (!g.isRunning) {
            return await startGame(await verifyToggleable(g))
          } else {
            return await stopGame(await verifyToggleable(g))
          }
        },
      },

      updateDisplaySettings: {
        type: displaySettingsType,
        args: {
          input: {
            type: new GraphQLNonNull(displaySettingsInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input: DisplaySettingsInput = args["input"];
          if (input) {
            const repo = (await getDisplaySettingsRepo())
            const settings = await repo.findOne({ where: { id: 1 } });
            await settings.update({ ...input });
            return settings.dataValues;
          }
          return null;
        },
      },

      updateWheelSettings: {
        type: wheelSettingsType,
        args: {
          input: {
            type: new GraphQLNonNull(wheelSettingsInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input: WheelSettingsInput = args["input"];
          if (input) {
            const result = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } }));
            await result.update({ ...input })
            return result.dataValues;
          }
          return null;
        },
      },
      updateOrCreateWheelPart: {
        type: wheelPartType,
        args: {
          input: {
            type: new GraphQLNonNull(updateWheelPartInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input: UpdateWheelPartInput = args["input"];
          if (input) {
            await updateOrAddWheelValue({ ...input });
            return (await getWheelValues()).find((v) => v.name === input.name);
          }
          return null;
        },
      },
      toggleDisableWheelValue: {
        type: wheelPartType,
        args: {
          ["name"]: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: async (source, args, context, info) => {
          const repo = await getWheelValuesRepo();
          const name = args["name"];
          if (typeof name !== "string" ||
            name.length === 0) {
            throw new Error("Name must not be empty")
          }
          const item = await repo.findOne({ where: { name } });
          await item.update({ disabled: !item.dataValues.disabled });
          return item.dataValues;
        },
      },
    },
  }),
  subscription: new GraphQLObjectType({
    name: "Subscription",
    fields: {
      gameChanged: {
        type: gameType,

        subscribe: () => {
          setTimeout(async () => {
            const g = (await getGame());
            console.log({game: g.dataValues})
            pubsub.publish('GAME_CHANGED', { gameChanged: g });
          }, 100)
          return pubsub.asyncIterator(['GAME_CHANGED'])
        },
      }
    }
  }),
});
