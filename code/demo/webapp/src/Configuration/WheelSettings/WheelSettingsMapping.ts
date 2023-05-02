import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import {
  UpdateWheelSettingsInputType,
  UpdateWheelSettingsMutationReturnType,
} from "./UpdateWheelSettingsMutationReturnType";

const groupAndOrderFields: GroupAndOrderTypes<UpdateWheelSettingsInputType> = {
  fields: {
    radius: { ordinal: 1 },
    rotationDurationInner: { ordinal: 2 },
    rotationDurationNotPlaying: { ordinal: 2 },
    rotationDurationPlaying: { ordinal: 2 },
  },
};

export interface WheelSettingsMapping
  extends InFormMapping<
    UpdateWheelSettingsInputType,
    UpdateWheelSettingsMutationReturnType
  > {
  name: "WheelSettings";
  groupAndOrderFields: typeof groupAndOrderFields;
}
