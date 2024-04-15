import { GraphQLObjectType } from "graphql";
import { wheelSettingsFields } from "./wheelSettingsFields.mjs";

export const wheelSettingsType = new GraphQLObjectType({
    name: "WheelSettings",
    fields: wheelSettingsFields,
  });
  