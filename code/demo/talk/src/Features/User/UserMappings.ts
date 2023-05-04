import {
  GroupAndOrderTypes,
  InFormMapping,
} from "@derfrodo/gen-in-form-runtime";
import { ReturnedUserArrayElement } from "./UserObject";
import { CreateUserInput, UpdateUserInput } from "../../gql/generated-client/graphql";

const groupAndOrderFields: GroupAndOrderTypes<ReturnedUserArrayElement> = {
  fields: {
    __typename: { ordinal: 10, isHidden: true },
  },
};

export interface CreateUserMapping
  extends InFormMapping<CreateUserInput> {
  name: "CreateUser";
  groupAndOrderFields: typeof groupAndOrderFields;
}


export interface UpdateUserMapping
  extends InFormMapping<UpdateUserInput, ReturnedUserArrayElement> {
  name: "UpdateUser";
  groupAndOrderFields: typeof groupAndOrderFields;
}
