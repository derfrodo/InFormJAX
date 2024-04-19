import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { ReturnedWheelPartArrayElement } from "./ReturnedWheelPartArrayElement";
import { UpdateWheelPartInput } from "../../../generated-client/graphql";

const groupAndOrderFields: GroupAndOrderTypes<ReturnedWheelPartArrayElement> = {
  fields: {
    __typename: { ordinal: 10, isHidden: true },
    name: { ordinal: 10 },
    imagePath: { ordinal: 10 },
    imageText: { ordinal: 10 },
    win: { ordinal: 1 },
    winText: { ordinal: 10 },
    disabled: { ordinal: 2 },
  },
};

export interface UpdateConfigPartMapping
  extends InFormMapping<UpdateWheelPartInput, ReturnedWheelPartArrayElement> {
  name: "UpdateWheelPart";
  groupAndOrderFields: typeof groupAndOrderFields;
}

const createGroupAndOrderFields: GroupAndOrderTypes<ReturnedWheelPartArrayElement> = {
  fields: {
    __typename: { ordinal: 10, isHidden: true },
  },
};

export interface CreateConfigPartMapping
  extends InFormMapping<UpdateWheelPartInput> {
  name: "CreateWheelPart";
  groupAndOrderFields: typeof createGroupAndOrderFields;
}
