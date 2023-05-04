import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { contactFields } from "./contactFields";

export const updateContactInputType = new GraphQLInputObjectType({
    name: "UpdateContactInput",
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      ...contactFields,
    },
  });
  