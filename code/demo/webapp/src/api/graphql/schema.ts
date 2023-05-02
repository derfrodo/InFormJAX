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
import { WheelPartFilter } from "../generated-types/graphql";

import {
  displaySettingsInputType,
  displaySettingsType,
  wheelPartType,
} from "./types/wheelPartType";
import {
  getFilteredWheelParts,
  disabledWheelValues,
} from "../data/disabledWheelValues";

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

          return { showResultInMS: 3 };
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
      updateSettings: {
        type: displaySettingsType,
        args: {
          input: {
            type: new GraphQLNonNull(displaySettingsInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input = args["input"];

          return input;
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
