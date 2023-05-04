import { GraphQLInputObjectType } from "graphql";
import { contactFields } from "./contactFields";

export const createContactInputType = new GraphQLInputObjectType({
    name: "CreateContactInput",
    fields: contactFields,
  });
  