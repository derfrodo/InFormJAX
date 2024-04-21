import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID, GraphQLNonNull,
  GraphQLObjectType
} from "graphql";
import { dateType } from "./dateType.mjs";


export const gameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
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

  }),
});
