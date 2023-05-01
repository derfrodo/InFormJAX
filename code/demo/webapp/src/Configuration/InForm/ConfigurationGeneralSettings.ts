import { Scalars } from "../../gql/generated-client/graphql";
import type {
  InFormDataTypes,
  InFormDataTypeWithDefaultValueAndComponent,
  InFormGeneralSettings,
  InFormPropertyMatcherRegexRegex,
} from "@derfrodo/gen-in-form-runtime";
import { StringInput } from "./StringInput";

// const test: GroupAndOrderTypes<UpdateUserInput> = {
//     fields: {
//         id: { ordinal: 1, isHidden: true },
//         firstName: { ordinal: 2 },
//         lastName: { ordinal: 3 },
//         gender: { ordinal: 3 },
//         birthday: { ordinal: 4 },
//         identityCardExpires: { ordinal: 5 },
//         weight: { ordinal: 6 },
//     },
// };

const identityCardExpires = /[A-Z]/;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
  ["STRING"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    Scalars["String"],
    "",
    typeof StringInput
  >;
  // Specific properties (resolve them using RegEx)
  // ["identityCardExpires"]: InFormDataTypeWithDefaultValueAndComponent<"ID", Scalars['DateTime'], "2022-11-09T00:00:00Z", typeof StringInput,
  // InFormPropertyMatcherRegexRegex<typeof identityCardExpires>>

  // // General Properties with value types
  // ["STRING"]: InFormDataTypeWithDefaultValueAndComponent<"STRING", Scalars['String'], "", typeof FakeComp>
  // ["INTEGER"]: InFormDataTypeWithDefaultValueAndComponent<"INTEGER", Scalars['Int'], 0, typeof FakeComp>
  // ["FLOAT"]: InFormDataTypeWithDefaultValueAndComponent<"FLOAT", Scalars['Float'], 0, typeof FakeComp>
  // ["MAYBEFLOAT"]: InFormDataTypeWithDefaultValueAndComponent<"MAYBEFLOAT", InputMaybe<Scalars['Float']>, null, typeof FakeComp2>

  // // General Properties with value types, but logic due to representing special stuff (dates ;) )
  // ["DATE"]: InFormDataTypeWithDefaultValueAndComponent<"DATE", Scalars['DateTime'], null, typeof FakeComp>
  // ["MAYBEDATE"]: InFormDataTypeWithDefaultValueAndComponent<"MAYBEDATE", InputMaybe<Scalars['DateTime']>, null, typeof FakeComp>

  // // Select fields - currently implemented in a specific way
  // ["Genders"]: InFormDataTypeWithDefaultValueAndComponent<"Genders", Genders, Genders.None, typeof FakeComp>
}

export interface ConfigurationGeneralSettings
  extends InFormGeneralSettings<FM> {}
