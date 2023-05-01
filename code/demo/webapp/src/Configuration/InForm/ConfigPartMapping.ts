import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { ReturnedWheelPartArrayElement } from "./WheelPartType";

export interface ConfigPartMapping
  extends InFormMapping<ReturnedWheelPartArrayElement> { //,
  // GetUserDetailQuery["userDetail"] & {}
  name: "WheelPartArrayElement";
  // groupAndOrderFields: typeof test;
}
