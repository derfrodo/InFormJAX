/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery DisplaySettings {\n    displaySettings {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n": types.DisplaySettingsDocument,
    "\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n": types.UpdateSettingsDocument,
    "\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n  }\n}\n": types.UpdateWheelSettingsDocument,
    "\n  query me {\n    firstname\n  }\n": types.MeDocument,
    "\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n": types.WheelPartsDocument,
    "\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n": types.ToggleDisableWheelValueDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery DisplaySettings {\n    displaySettings {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"): (typeof documents)["\nquery DisplaySettings {\n    displaySettings {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n  }\n}\n"): (typeof documents)["\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    firstname\n  }\n"): (typeof documents)["\n  query me {\n    firstname\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n"): (typeof documents)["\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n"): (typeof documents)["\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      name\n      imagePath\n      imageText\n      win\n      winText\n      disabled\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;