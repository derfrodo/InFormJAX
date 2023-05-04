import { GraphQLInputObjectType } from "graphql";
import { userFields } from "./userFields";

export const createUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInput",
    fields: userFields,
  });
  