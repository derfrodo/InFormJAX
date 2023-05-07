import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { UpdateDisplaySettingsMutationReturnType } from "./UpdateDisplaySettingsMutationReturnType";
import { DisplaySettingsInput } from "../../gql/generated-client/graphql";

const groupAndOrderFields: GroupAndOrderTypes<UpdateDisplaySettingsMutationReturnType> =
  {
    fields: {
      __typename: { ordinal: 10, isHidden: true },

      showResultAfterMS: { ordinal: 1 },
      showResultForMS: { ordinal: 2 },
    },
  };

export interface DisplaySettingsMapping
  extends InFormMapping<DisplaySettingsInput, UpdateDisplaySettingsMutationReturnType> {
  name: "DisplaySettings";
  groupAndOrderFields: typeof groupAndOrderFields;
}
