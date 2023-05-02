import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { UpdateWheelSettingsMutationReturnType } from "./UpdateWheelSettingsMutationReturnType";

const groupAndOrderFields: GroupAndOrderTypes<UpdateWheelSettingsMutationReturnType> =
  {
    fields: {
      __typename: { ordinal: 10, isHidden: true },

      radius: { ordinal: 1 },
      rotationDurationInner: { ordinal: 2 },
      rotationDurationNotPlaying: { ordinal: 2 },
      rotationDurationPlaying: { ordinal: 2 },
    },
  };

export interface WheelSettingsMapping
  extends InFormMapping<UpdateWheelSettingsMutationReturnType> {
  name: "DisplaySettings";
  groupAndOrderFields: typeof groupAndOrderFields;
}
