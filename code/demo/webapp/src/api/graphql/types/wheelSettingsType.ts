import { GraphQLObjectType } from "graphql";
import { wheelSettingsFields } from "./wheelSettingsFields";

export const wheelSettingsType = new GraphQLObjectType({
    name: "WheelSettings",
    fields: wheelSettingsFields,
  });
  