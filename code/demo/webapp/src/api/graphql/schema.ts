import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { getWheelValues } from "../../Wheel/constants/WHEELVALUES";
import {
  DisplaySettingsInput,
  WheelPartFilter,
  WheelSettingsInput,
} from "../generated-types/graphql";

import {
  disabledWheelValues,
  getFilteredWheelParts,
} from "../data/disabledWheelValues";
import { sessionDisplaySettings } from "../data/sessionDisplaySettings";
import { wheelPartType } from "./types/wheelPartType";
import { sessionWheelSettings } from "../data/sessionWheelSettings";
import { displaySettingsInputType } from "./types/displaySettingsInputType";
import { displaySettingsType } from "./types/displaySettingsType";
import { wheelSettingsInputType } from "./types/wheelSettingsInputType";
import { wheelSettingsType } from "./types/wheelSettingsType";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      wheelParts: {
        type: new GraphQLList(new GraphQLNonNull(wheelPartType)),

        args: {
          ["filter"]: {
            type: new GraphQLInputObjectType({
              name: "wheelPartFilter",
              fields: {
                disabled: {
                  type: GraphQLBoolean,
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

      firstname: {
        type: GraphQLString,
        async resolve() {
          await new Promise<void>((r) => setTimeout(() => r(), 100));

          return "Stefan";
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
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
          }

          return sessionWheelSettings;
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
});
