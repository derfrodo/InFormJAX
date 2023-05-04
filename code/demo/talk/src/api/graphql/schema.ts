import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";

import { createUser, createUserId, updateUser, users } from "../data/users";
import { createUserInputType } from "./types/createUserInputType";
import { userType } from "./types/userType";
import { User } from "../generated-types/graphql";
import { updateUserInputType } from "./types/updateUserInputType";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      users: {
        type: new GraphQLList(new GraphQLNonNull(userType)),
        async resolve(source, args, context, info) {
          return users;
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: new GraphQLNonNull(userType),
        args: {
          input: {
            type: new GraphQLNonNull(createUserInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input: Omit<User, "id"> = args["input"];
          return createUser(input);
        },
      },

      updateUser: {
        type: new GraphQLNonNull(userType),
        args: {
          input: {
            type: new GraphQLNonNull(updateUserInputType),
          },
        },
        resolve: async (source, args, context, info) => {
          const input: User = args["input"];

          return updateUser(input);
        },
      },
    },
  }),
});
