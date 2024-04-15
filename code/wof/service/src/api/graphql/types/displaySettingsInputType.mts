import { GraphQLInputObjectType } from "graphql";
import { displaySettingsFields } from "./displaySettingsFields.mjs";

export const displaySettingsInputType = new GraphQLInputObjectType({
    name: "DisplaySettingsInput",
    fields: displaySettingsFields,
  });
  