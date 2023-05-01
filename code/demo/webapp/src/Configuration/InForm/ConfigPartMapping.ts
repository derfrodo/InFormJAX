import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { ReturnedWheelPartArrayElement } from "./WheelPartType";

const groupAndOrderFields: GroupAndOrderTypes<ReturnedWheelPartArrayElement> = {
  fields: {
    __typename: { ordinal: 10, isHidden: true },
    name: { ordinal: 10 },
    imagePath: { ordinal: 10 },
    imageText: { ordinal: 10 },
    win: { ordinal: 1 },
    winText: { ordinal: 10 },
  },
};

export interface ConfigPartMapping
  extends InFormMapping<ReturnedWheelPartArrayElement> {
  //,
  // GetUserDetailQuery["userDetail"] & {}
  name: "WheelPartArrayElement";
  groupAndOrderFields: typeof groupAndOrderFields;
}
