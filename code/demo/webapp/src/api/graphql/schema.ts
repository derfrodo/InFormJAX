import type { WheelValue } from "../../Wheel/types/WheelValue";
import { getWheelValues } from "../../Wheel/constants/WHEELVALUES";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";

const wheelPartType = new GraphQLObjectType<WheelValue>({
  fields: {
    name: {
      type: GraphQLString,
      // async resolve(source, context, args) {
      //   console.log(source.name);
      //   await new Promise<void>((r) => setTimeout(() => r(), 2000));
      //   return source.name;
      // },
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
        type: new GraphQLList(wheelPartType),
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
