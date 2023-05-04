import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { userFields } from "./userFields";

export const updateUserInputType = new GraphQLInputObjectType({
    name: "UpdateUserInput",
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      ...userFields,
    },
  });
  