import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { UpdateDisplaySettingsMutationReturnType } from "./UpdateDisplaySettingsMutationReturnType";

const groupAndOrderFields: GroupAndOrderTypes<UpdateDisplaySettingsMutationReturnType> =
  {
    fields: {
      __typename: { ordinal: 10, isHidden: true },

      showResultInMS: { ordinal: 1 },
    },
  };

export interface ConfigPartMapping
  extends InFormMapping<UpdateDisplaySettingsMutationReturnType> {
  name: "DisplaySettings";
  groupAndOrderFields: typeof groupAndOrderFields;
}
