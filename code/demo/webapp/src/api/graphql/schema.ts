import type { WheelValue } from "../../Wheel/types/WheelValue";
import { getWheelValues } from "../../Wheel/constants/WHEELVALUES";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";
import { resolve } from "path";

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
      resolve: (context) => {
        return disabledWheelValues.some((item) => item.name === context.name);
      },
    },
  },
  name: "WheelPart",
});

const disabledWheelValues: WheelValue[] = [...getWheelValues()];

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      wheelParts: {
        type: new GraphQLList(new GraphQLNonNull(wheelPartType)),
        async resolve() {
          await new Promise<void>((r) => setTimeout(() => r(), 2000));
          return getWheelValues();
        },
      },

      firstname: {
        type: GraphQLString,
        async resolve() {
          await new Promise<void>((r) => setTimeout(() => r(), 2000));

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
        resolve: (source, args, context, info) => {
          const name = args["name"];

          const v = getWheelValues().find((value) => value.name === name);
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
