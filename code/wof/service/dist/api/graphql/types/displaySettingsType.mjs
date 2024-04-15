import { GraphQLObjectType } from "graphql";
import { displaySettingsFields } from "./displaySettingsFields.mjs";
export const displaySettingsType = new GraphQLObjectType({
    name: "DisplaySettings",
    fields: displaySettingsFields,
});
