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
import type { WheelValue } from "../../Wheel/types/WheelValue";
import { WheelPartFilter } from "../generated-types/graphql";

const wheelPartType = new GraphQLObjectType<WheelValue>({
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    win: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    imageText: {
      type: GraphQLString,
    },
    imagePath: {
      type: GraphQLString,
    },
    winText: {
      type: GraphQLString,
    },
    image: {
      type: GraphQLString,
    },
    disabled: {
      type: GraphQLBoolean,
      resolve: (source) => {
        console.log(disabledWheelValues);
        return disabledWheelValues.some((item) => item.name === source.name);
      },
    },
  },
  name: "WheelPart",
});

const disabledWheelValues: WheelValue[] = [];

const getFilteredWheelParts = async (filter: WheelPartFilter) => {
  return (await getWheelValues()).filter((value) =>
    filter.disabled === null || filter.disabled
      ? disabledWheelValues.some((v) => v.name === value.name)
      : disabledWheelValues.every((v) => v.name !== value.name)
  );
};

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
