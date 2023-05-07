import type {
  InFormDataTypes,
  InFormDataTypeWithDefaultValueAndComponent,
  InFormGeneralSettings,
  InFormPropertyMatcherRegexRegex,
} from "@derfrodo/gen-in-form-runtime";

const image = /imagePath/i;

/**
 * Mapping "input property types to keys and output types"
 */
interface FM extends InFormDataTypes<string, string> {
}

export interface ConfigurationGeneralSettings
  extends InFormGeneralSettings<FM> { }
