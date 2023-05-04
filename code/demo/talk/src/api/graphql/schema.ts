import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import { userMutations, userQueries } from "./types/User/userSchema";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...userQueries
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...userMutations,
    },
  }),
});
