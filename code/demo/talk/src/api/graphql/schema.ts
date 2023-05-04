import {
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import { userMutations, userQueries } from "./types/User/userSchema";
import { contactMutations, contactQueries } from "./types/Contact/contactSchema";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...userQueries,
      // ...contactQueries
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...userMutations,
      // ...contactMutations
    },
  }),
});
