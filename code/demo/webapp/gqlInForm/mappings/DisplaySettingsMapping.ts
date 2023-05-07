import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { DisplaySettings, WheelPart } from "../../src/api/generated-types/graphql";

const groupAndOrderFields: GroupAndOrderTypes<any> = {
  fields: {
    __typename: { ordinal: 10, isHidden: true },
  },
};

export interface DisplaySettingsMapping
  extends InFormMapping<DisplaySettings> {
  name: "displaySettings";
  groupAndOrderFields: typeof groupAndOrderFields;
}


export interface WheelPartMapping
  extends InFormMapping<WheelPart> {
  name: "wheelParts";
  groupAndOrderFields: typeof groupAndOrderFields;
}
