import { Scalars } from "../../gql/generated-client/graphql";
import type {
  InFormDataTypes,
  InFormDataTypeWithDefaultValueAndComponent,
  InFormGeneralSettings,
  InFormPropertyMatcherRegexRegex,
} from "@derfrodo/gen-in-form-runtime";
import { ImageCell, StringCell } from "./atoms/StringCell";
import { BoolCell } from "./atoms/BoolCell";
import { BoolInput } from "./atoms/BoolInput";
import { StringInput } from "./atoms/StringInput";
import { IntCell, IntInput } from "./atoms/IntCell";

const image = /imagePath/i;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
  ["IMAGECELL"]: InFormDataTypeWithDefaultValueAndComponent<
    "ImageCELL",
    string | null,
    "",
    typeof ImageCell,
    InFormPropertyMatcherRegexRegex<typeof image>
  >;

  ["NUMBERCELL"]: InFormDataTypeWithDefaultValueAndComponent<
    "NUMBERCELL",
    number,
    0,
    typeof IntCell
  >;
  ["NUMBER"]: InFormDataTypeWithDefaultValueAndComponent<
    "NUMBER",
    number,
    "",
    typeof IntInput
  >;

  ["STRINGSCALAR"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    Scalars["String"],
    "",
    typeof StringInput
  >;

  ["StNullUndef"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    string | null,
    "",
    typeof StringInput
  >;
  ["StNullUndefCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRINGCELL",
    string | null,
    "",
    typeof StringCell
  >;

  ["String"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    string,
    "",
    typeof StringInput
  >;

  ["StringCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRINGCELL",
    string,
    "",
    typeof StringCell
  >;

  ["BooleanCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "BOOLCELL",
    boolean,
    false,
    typeof BoolCell
  >;

  ["Boolean"]: InFormDataTypeWithDefaultValueAndComponent<
    "BOOL",
    boolean,
    false,
    typeof BoolInput
  >;

  ["OptBooleanCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "BOOLCELL",
    boolean | null,
    false,
    typeof BoolCell
  >;

  ["OptBoolean"]: InFormDataTypeWithDefaultValueAndComponent<
    "BOOL",
    boolean | null,
    false,
    typeof BoolInput
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
