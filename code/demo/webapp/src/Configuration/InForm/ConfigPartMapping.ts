import { InFormMapping } from "@derfrodo/gen-in-form-runtime";
import { TT } from "./WheelPartType";

export interface ConfigPartMapping
  extends InFormMapping<TT> { //,
  // GetUserDetailQuery["userDetail"] & {}
  name: "UpdateUser";
  // groupAndOrderFields: typeof test;
}
