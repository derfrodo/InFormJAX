import {
  UpdateWheelSettingsMutation,
  WheelSettingsInput,
} from "../../gql/generated-client/graphql";

export type UpdateWheelSettingsMutationReturnType =
  UpdateWheelSettingsMutation["updateWheelSettings"] & {};

export type UpdateWheelSettingsInputType = WheelSettingsInput;
