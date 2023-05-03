import { GraphQLInputObjectType } from "graphql";
import { displaySettingsFields } from "./displaySettingsFields";

export const displaySettingsInputType = new GraphQLInputObjectType({
    name: "DisplaySettingsInput",
    fields: displaySettingsFields,
  });
  