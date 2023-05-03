import { GraphQLObjectType } from "graphql";
import { displaySettingsFields } from "./displaySettingsFields";

export const displaySettingsType = new GraphQLObjectType({
  name: "DisplaySettings",
  fields: displaySettingsFields,
});
