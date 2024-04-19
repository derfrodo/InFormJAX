import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

import { disabledWheelValues, getFilteredWheelParts } from "../data/disabledWheelValues.mjs";
import { getWheelValues, updateOrAddWheelValue } from "../data/getWheelValues.mjs";
import { sessionDisplaySettings } from "../data/sessionDisplaySettings.mjs";
import { sessionWheelSettings } from "../data/sessionWheelSettings.mjs";
import { DisplaySettingsInput, UpdateWheelPartInput, WheelPartFilter, WheelSettingsInput } from "../generated-types/graphql.mjs";
import { displaySettingsInputType } from "./types/displaySettingsInputType.mjs";
import { displaySettingsType } from "./types/displaySettingsType.mjs";
import { gameSettingsType, getChanceToWin, getSumOfLooseChance, getSumOfWinChance } from "./types/gameSettingsType.mjs";
import { updateWheelPartInputType, wheelPartType } from "./types/wheelPartType.mjs";
import { wheelSettingsInputType } from "./types/wheelSettingsInputType.mjs";
import { wheelSettingsType } from "./types/wheelSettingsType.mjs";

const games: GameResult[] = []

type GameResult = {
  result: WheelValue;
  date: string;
};

type Game = {
  isRunning: boolean;
  lastUpdate: number;
  isRoundDone: boolean;
  result: null | WheelValue;
  resultIndex: null | number;
  readonly canToggle: boolean;
};

const game: Game = {
  isRoundDone: true,
  isRunning: false,
  lastUpdate: performance.now(),
  result: null,
  resultIndex: null,
  get canToggle() {
    const now = performance.now();
    const diff = game.lastUpdate + sessionWheelSettings.minClickDelayMS - now;
    return (diff <= 0);
  }
}

function isWinner(winChance: number) {
  if (winChance > 1) {
    console.error("Chance of winning must be between 0 and 1");
  }
  const randomResult = Math.random();

  return randomResult < winChance;
}

function getWinner(sumOfChances: number, values: WheelValue[]) {
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

  const values: WheelValue[] = await getFilteredWheelParts({ disabled: false });
  if (winner) {
    //WON!
    const winOptions = values.filter((value) => value.win);
    const winOffset = getWinner(sumOfWinChance, winOptions);
    const winIndex = values.indexOf(winOffset);
    return { index: winIndex, result: values[winIndex] }
  } else {
    // LOST!
    const lostOptions = values.filter((value) => !value.win);
    const lostOffset = getWinner(sumOfLooseChance, lostOptions);
    const lostIndex = values.indexOf(lostOffset);
    return { index: lostIndex, result: values[lostIndex] }
  }
}

export const gameType = new GraphQLObjectType({
  name: "Game",
  fields: {
    isRunning: {
      type: new GraphQLNonNull(GraphQLBoolean),
      async resolve() {
        return game.isRunning;
      },
    },
    isRoundDone: {
      type: new GraphQLNonNull(GraphQLBoolean),
      async resolve() {
        return game.isRoundDone;
      },
    },
    lastUpdate: {
      type: new GraphQLNonNull(GraphQLFloat),
      async resolve() {
        return game.lastUpdate;
      },
    },
    canToggle: {
      type: new GraphQLNonNull(GraphQLBoolean),
      async resolve() {
        return game.canToggle;
      },
    },
    result: {
      type: wheelPartType,
      async resolve() {
        return game.result;
      },
    },
    resultIndex: {
      type: GraphQLInt,
      async resolve() {
        return game.resultIndex;
      },
    },
  },
});
const dateType = new GraphQLScalarType<string, string>({ name: "Date" });
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

import { PubSub } from 'graphql-subscriptions';
import { CHECK_CHANCE } from "../data/constants/WIN_CHANCE";
import { WheelValue } from "../data/types/WheelValue.mjs";

const pubsub = new PubSub();

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
          await new Promise<void>((r) => setTimeout(() => r(), 100));

          return sessionDisplaySettings;
        },
      },
      wheelSettings: {
        type: wheelSettingsType,

        async resolve() {
          await new Promise<void>((r) => setTimeout(() => r(), 100));

          return sessionWheelSettings;
        },
      },

      gameSettings: {
        type: gameSettingsType,
        resolve() {
          return {};
        },
      },

      firstname: {
        type: GraphQLString,
        async resolve() {
          await new Promise<void>((r) => setTimeout(() => r(), 100));

          return "Stefan";
        },
      },

      game: {
        type: gameType,
        resolve() {
          return {};
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
          const now = performance.now();
          const diff = game.lastUpdate + sessionWheelSettings.minClickDelayMS - now;
          if (diff > 0) {
            throw new Error(`Wait for additional ${diff}ms`)
          }
          game.result = null;
          game.resultIndex = null;
          game.isRunning = true;
          game.lastUpdate = now;
          game.isRoundDone = false;

          pubsub.publish('GAME_CHANGED', { gameChanged: game });
          setTimeout(() => {
            pubsub.publish('GAME_CHANGED', { gameChanged: game });
          },
            sessionWheelSettings.minClickDelayMS + 100
          )
          return {};
        },
      },

      stopWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          const now = performance.now();
          const diff = game.lastUpdate + sessionWheelSettings.minClickDelayMS - now;
          if (diff > 0) {
            throw new Error(`Wait for additional ${diff}ms`)
          }

          const result = await calculateWinner();
          games.push({ ...result, date: new Date(Date.now()).toISOString() })
          game.result = result.result;
          game.resultIndex = result.index;
          game.isRunning = false;

          game.lastUpdate = now;
          pubsub.publish('GAME_CHANGED', { gameChanged: game });
          setTimeout(() => {
            game.isRoundDone = true;

            pubsub.publish('GAME_CHANGED', { gameChanged: game });

          }, sessionDisplaySettings.showResultAfterMS + sessionDisplaySettings.showResultForMS)
          setTimeout(() => {
            pubsub.publish('GAME_CHANGED', { gameChanged: game });
          },
            sessionWheelSettings.minClickDelayMS + 1
          )
          return {};
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
            sessionDisplaySettings.showResultAfterMS =
              input.showResultAfterMS ??
              sessionDisplaySettings.showResultAfterMS;
            sessionDisplaySettings.showResultForMS =
              input.showResultForMS ?? sessionDisplaySettings.showResultForMS;
          }

          return sessionDisplaySettings;
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
            sessionWheelSettings.radius =
              input.radius ?? sessionWheelSettings.radius;
            sessionWheelSettings.rotationDurationInner =
              input.rotationDurationInner ??
              sessionWheelSettings.rotationDurationInner;
            sessionWheelSettings.rotationDurationNotPlaying =
              input.rotationDurationNotPlaying ??
              sessionWheelSettings.rotationDurationNotPlaying;
            sessionWheelSettings.rotationDurationPlaying =
              input.rotationDurationPlaying ??
              sessionWheelSettings.rotationDurationPlaying;
            sessionWheelSettings.minClickDelayMS =
              input.minClickDelayMS ??
              sessionWheelSettings.minClickDelayMS;

          }

          return sessionWheelSettings;
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
            await updateOrAddWheelValue(input);
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
          const name = args["name"];

          const v = (await getWheelValues()).find(
            (value) => value.name === name
          );
          if (v) {
            const inext = disabledWheelValues.findIndex(
              (value) => value.name === v.name
            );
            if (inext >= 0) {
              disabledWheelValues.splice(inext, 1);
              return v;
            } else {
              disabledWheelValues.push(v);
              return v;
            }
          }
          return null;
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
          setTimeout(() => {
            pubsub.publish('GAME_CHANGED', { gameChanged: game });
          }, 100)
          return pubsub.asyncIterator(['GAME_CHANGED'])
        },
      }
    }
  }),
});
