import { GraphQLInputObjectType } from "graphql";
import { wheelSettingsFields } from "./wheelSettingsFields";

export const wheelSettingsInputType = new GraphQLInputObjectType({
    name: "WheelSettingsInput",
    fields: wheelSettingsFields,
  });
  