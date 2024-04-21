import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

import { getDisplaySettingsRepo } from "../../data/DisplaySettingsRepo.mjs";
import { getGameResultsRepo } from "../../data/GameResultsRepo.mjs";
import { getWheelSettingsRepo } from "../../data/WheelSettingsRepo.mjs";
import { getWheelValuesRepo } from "../../data/WheelValuesRepo.mjs";
import { getFilteredWheelParts } from "../data/disabledWheelValues.mjs";
import { getWheelValues, updateOrAddWheelValue } from "../data/getWheelValues.mjs";
import { DisplaySettingsInput, UpdateWheelPartInput, WheelPartFilter, WheelSettingsInput } from "../generated-types/graphql.mjs";
import { getGame } from "../utils/getGame.mjs";
import { pubsub } from "../utils/pubsub.mjs";
import { startGame } from "../utils/startGame.mjs";
import { stopGame } from "../utils/stopGame.mjs";
import { verifyToggleable } from "../utils/verifyToggleable.mjs";
import { displaySettingsInputType } from "./types/displaySettingsInputType.mjs";
import { displaySettingsType } from "./types/displaySettingsType.mjs";
import { gameInfoType } from "./types/gameInfoType.mjs";
import { gameResultType } from "./types/gameResultType.mjs";
import { gameType } from "./types/gameType.mjs";
import { updateWheelPartInputType, wheelPartType } from "./types/wheelPartType.mjs";
import { wheelSettingsInputType } from "./types/wheelSettingsInputType.mjs";
import { wheelSettingsType } from "./types/wheelSettingsType.mjs";

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
              async resolve() {
                const repo = await getGameResultsRepo();
                return await repo.findAll();
              }
            },
            total: {
              type: GraphQLInt,
              async resolve() {
                const repo = await getGameResultsRepo();
                return await repo.count();
              }
            },
            won: {
              type: GraphQLInt,
              async resolve() {
                const repo = await getGameResultsRepo();
                return await repo.count({ where: { win: true } });
              }
            },
            loose: {
              type: GraphQLInt,
              async resolve() {
                const repo = await getGameResultsRepo();
                return await repo.count({ where: { win: false } });
              }
            }
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

      gameInfo: {
        type: gameInfoType,
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
          const g = (await getGame()).dataValues;
          if (g.isRoundDone) {
            return await startGame(await verifyToggleable((await getGame()).dataValues))
          }
          throw new Error("Round is not done yet")
        },
      },

      stopWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          const g = (await getGame()).dataValues;
          if (g.isRunning) {
            return await stopGame(await verifyToggleable((await getGame()).dataValues))
          }
          throw new Error("Game is not running")
        },
      },

      toggleWheel: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          const g = (await getGame()).dataValues;
          if (!g.isRunning && g.isRoundDone) {
            return await startGame(await verifyToggleable(g))
          } else if (g.isRunning) {
            return await stopGame(await verifyToggleable(g))
          }
          throw new Error("Toggle did not work. Neither start not stop makes sense.")
        },
      },

      startAutoplay: {
        type: gameType,
        resolve: async (source, args, context, info) => {
          const g = (await getGame()).dataValues;
          if (!g.isRunning && g.isRoundDone) {
            const repo = await getWheelSettingsRepo();
            const { minClickDelayMS, minAutoplayDurationMS, autoplayAddMaxMS } = (await repo.findOne({ where: { id: 1 } })).dataValues;
            const delay = Math.floor(Math.random() * autoplayAddMaxMS) + minAutoplayDurationMS;
            console.log("Autoplay for ", delay)
            await startGame(await verifyToggleable(g), true)
            setTimeout(async () => {
              await stopGame(performance.now())
            }, delay)
            return (await getGame()).dataValues
          } else {
            throw new Error("Game is already running")
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
            console.log({ game: g.dataValues })
            pubsub.publish('GAME_CHANGED', { gameChanged: g });
          }, 100)
          return pubsub.asyncIterator(['GAME_CHANGED'])
        },
      }
    }
  }),
});
