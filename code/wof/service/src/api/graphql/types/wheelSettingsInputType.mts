import { GraphQLInputObjectType } from "graphql";
import { wheelSettingsFields } from "./wheelSettingsFields.mjs";

export const wheelSettingsInputType = new GraphQLInputObjectType({
    name: "WheelSettingsInput",
    fields: wheelSettingsFields,
  });
  