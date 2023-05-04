import type {
  InFormDataTypes,
  InFormDataTypeWithDefaultValueAndComponent,
  InFormGeneralSettings
} from "@derfrodo/gen-in-form-runtime";
import { Scalars } from "../../gql/generated-client/graphql";
import { StringCell } from "./atoms/StringCell";
import { StringInput } from "./atoms/StringInput";

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {


  ["Scalars['String']"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    Scalars['String'],
    "\"\"",
    typeof StringInput
  >;
  ["Scalars['String']Cell"]: InFormDataTypeWithDefaultValueAndComponent<
    "Scalars['String']CELL",
    Scalars['String'],
    "\"\"",
    typeof StringCell
  >;
  ["StringCELL"]: InFormDataTypeWithDefaultValueAndComponent<
    "StringCELL",
    string,
    "\"\"",
    typeof StringCell
  >;
  ["Scalars['ID']"]: InFormDataTypeWithDefaultValueAndComponent<
    "STRING",
    Scalars['ID'],
    "\"\"",
    typeof StringInput
  >;
  ["Scalars['ID']CELL"]: InFormDataTypeWithDefaultValueAndComponent<
    "Scalars['ID']CELL",
    Scalars['ID'],
    "\"\"",
    typeof StringCell
  >;
}

export interface ConfigurationGeneralSettings
  extends InFormGeneralSettings<FM> { }
