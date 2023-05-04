import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLID } from "graphql";
import { userFields } from "./userFields";

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...userFields,
  },
});
