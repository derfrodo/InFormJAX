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
    // win: boolean;
    // imageText?: string | null;
    // imagePath?: StaticImageData | string | null;
    // image: null | HTMLImageElement;
    // winText?: string;
  },
  name: "WheelPart",
});

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
});
