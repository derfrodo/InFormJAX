import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { userFields } from "./userFields";

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...userFields,
    displayName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(source) {
        return `${source.firstName} ${source.lastName}`
      }
    }
  },
});
