import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { contactFields } from "./contactFields";

export const contactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    ...contactFields
  },
});
