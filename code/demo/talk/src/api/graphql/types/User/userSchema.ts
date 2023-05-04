import { createUser, updateUser, users } from "../../../../api/data/users";
import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";
import { User } from "../../../generated-types/graphql";
import { createUserInputType } from "./createUserInputType";
import { updateUserInputType } from "./updateUserInputType";
import { userType } from "./userType";

export const userMutations: ObjMap<GraphQLFieldConfig<any, any, any>> = {

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
}

export const userQueries: ObjMap<GraphQLFieldConfig<any, any, any>> = {
  users: {
    type: new GraphQLList(new GraphQLNonNull(userType)),
    async resolve(source, args, context, info) {
      return users;
    },
  },
}