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
}

export interface ConfigurationGeneralSettings
  extends InFormGeneralSettings<FM> {}
