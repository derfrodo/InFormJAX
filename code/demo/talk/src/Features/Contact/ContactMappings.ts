// import {
//   GroupAndOrderTypes,
//   InFormMapping,
// } from "@derfrodo/gen-in-form-runtime";
// import { CreateContactInput, UpdateContactInput } from "../../gql/generated-client/graphql";
// import { ReturnedContactArrayElement } from "./ContactObject";

// const groupAndOrderFields: GroupAndOrderTypes<CreateContactInput> = {
//   fields: {
//   },
// };

// export interface CreateContactMapping
//   extends InFormMapping<CreateContactInput> {
//   name: "CreateContact";
//   groupAndOrderFields: typeof groupAndOrderFields;
// }


// const groupAndOrderFieldsUpdate: GroupAndOrderTypes<ReturnedContactArrayElement> = {
//   fields: {
//     __typename: { ordinal: 10, isHidden: true },
//     id: { ordinal: 10, isHidden: true },
//   },
// };
// export interface UpdateContactrMapping
//   extends InFormMapping<UpdateContactInput, ReturnedContactArrayElement> {
//   name: "UpdateContact";
//   groupAndOrderFields: typeof groupAndOrderFieldsUpdate;
// }
