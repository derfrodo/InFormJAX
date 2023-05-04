import { GraphQLInputObjectType } from "graphql";
import { contactFields } from "./contactFields";

export const createUserInputType = new GraphQLInputObjectType({
    name: "CreateContactInput",
    fields: contactFields,
  });
  