import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import type { WheelValue } from "../../Wheel/types/WheelValue";

export const wheelPartType = new GraphQLObjectType<WheelValue>({
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