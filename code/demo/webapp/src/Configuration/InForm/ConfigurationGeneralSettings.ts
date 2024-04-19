import type {
  InFormDataTypes,
  InFormDataTypeWithDefaultValueAndComponent,
  InFormGeneralSettings,
  InFormPropertyMatcherRegexRegex,
} from "@derfrodo/gen-in-form-runtime";
import { BoolCell } from "./atoms/BoolCell";
import { BoolInput } from "./atoms/BoolInput";
import { IntCell, IntInput } from "./atoms/IntCell";
import { StringCell } from "./atoms/StringCell";
import { ImageCell } from "./atoms/ImageCell";
import { StringInput } from "./atoms/StringInput";
import { InputMaybe, Scalars } from "../../gql/generated-client/graphql";

const image = /imagePath/i;
const disabled = /disabled/i;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
  ["IMAGECELL"]: InFormDataTypeWithDefaultValueAndComponent<
    "ImageCELL",
    string | null,
    '""',
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
    0,
    typeof IntInput
  >;
  ["NUMBERS"]: InFormDataTypeWithDefaultValueAndComponent<
    "NUMBERS",
    Scalars['Int']['input'],
    0,
    typeof IntInput
  >;
  
  ["StNullUndef"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    string | null,
    '""',
    typeof StringInput
  >;
  ["StNullUndefCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRINGCELL",
    string | null,
    '""',
    typeof StringCell
  >;

  ["String"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    string,
    '""',
    typeof StringInput
  >;

  ["StringCell"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRINGCELL",
    string,
    '""',
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

  ["Boolean2"]: InFormDataTypeWithDefaultValueAndComponent<
    "BOOL2",
    boolean,
    false,
    typeof BoolInput,
    InFormPropertyMatcherRegexRegex<typeof disabled>
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



  ["Scalars['Boolean']"]: InFormDataTypeWithDefaultValueAndComponent<
    "Scalars['Boolean']",
    Scalars['Boolean']['input'],
    false,
    typeof BoolInput
  >;
  ["Scalars['Float']"]: InFormDataTypeWithDefaultValueAndComponent<
    "Scalars['Float']",
    Scalars['Float']['input'],
    0,
    typeof IntInput
  >;
  
  ["InputMaybe<Scalars['String']>"]: InFormDataTypeWithDefaultValueAndComponent<
    "InputMaybe<Scalars['String']>",
    InputMaybe<Scalars['String']['input']>,
    '""',
    typeof StringInput
  >;
  ["Scalars['String']"]: InFormDataTypeWithDefaultValueAndComponent<
    "Scalars['String']",
    Scalars['String']['input'],
    '""',
    typeof StringInput
  >;
}

// image?: InputMaybe<Scalars['String']>;
// imagePath?: InputMaybe<Scalars['String']>;
// imageText?: InputMaybe<Scalars['String']>;
// name: Scalars['String'];
// win: Scalars['Boolean'];
// winChance: Scalars['Float'];
// winText?: InputMaybe<Scalars['String']>;
export interface ConfigurationGeneralSettings
  extends InFormGeneralSettings<FM> {}
