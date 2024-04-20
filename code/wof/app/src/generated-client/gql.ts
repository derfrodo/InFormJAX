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
    "\n  query wheelSettings {\n    wheelSettings {\n      radius\n      rotationDurationNotPlaying\n      rotationDurationPlaying\n      rotationDurationInner\n      minClickDelayMS\n      minAutoplayDurationMS\n      autoplayAddMaxMS\n    }\n  }\n": types.WheelSettingsDocument,
    "\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n": types.UpdateSettingsDocument,
    "\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n    minClickDelayMS\n  }\n}\n": types.UpdateWheelSettingsDocument,
    "\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n": types.ToggleDisableWheelValueDocument,
    "\nmutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {\n  updateOrCreateWheelPart(input: $input) {\n    id\n    name\n    imagePath\n    imageText\n    win\n    winText\n    winChance\n    disabled\n  }\n}\n": types.UpdateOrCreateWheelPartDocument,
    "\n  query gameInfo {\n    gameInfo {\n      chanceToWin\n      sumOfChances\n      sumOfWinChance\n      sumOfLooseChance\n    }\n  }\n": types.GameInfoDocument,
    "\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n": types.WheelPartsDocument,
    "\nmutation startWheel{\n    startWheel {\n      isRunning\n    }\n  }\n": types.StartWheelDocument,
    "\n  \n  mutation stopWheel {\n    stopWheel {\n      \n      isRunning\n    }\n  }\n": types.StopWheelDocument,
    "\nsubscription GameChanged {\n    gameChanged {\n        isRunning\n        isRoundDone\n        canToggle\n        resultId\n        date\n        lastUpdate\n    }\n  }\n": types.GameChangedDocument,
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
export function graphql(source: "\n  query wheelSettings {\n    wheelSettings {\n      radius\n      rotationDurationNotPlaying\n      rotationDurationPlaying\n      rotationDurationInner\n      minClickDelayMS\n      minAutoplayDurationMS\n      autoplayAddMaxMS\n    }\n  }\n"): (typeof documents)["\n  query wheelSettings {\n    wheelSettings {\n      radius\n      rotationDurationNotPlaying\n      rotationDurationPlaying\n      rotationDurationInner\n      minClickDelayMS\n      minAutoplayDurationMS\n      autoplayAddMaxMS\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSettings($input: DisplaySettingsInput!) {\n    updateDisplaySettings(input: $input) {\n        showResultAfterMS\n        showResultForMS\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n    minClickDelayMS\n  }\n}\n"): (typeof documents)["\nmutation UpdateWheelSettings($input: WheelSettingsInput!) {\n  updateWheelSettings(input: $input) {\n    radius\n    rotationDurationInner\n    rotationDurationNotPlaying\n    rotationDurationPlaying\n    minClickDelayMS\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n"): (typeof documents)["\n  mutation toggleDisableWheelValue($name: String!) {\n    toggleDisableWheelValue(name: $name) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {\n  updateOrCreateWheelPart(input: $input) {\n    id\n    name\n    imagePath\n    imageText\n    win\n    winText\n    winChance\n    disabled\n  }\n}\n"): (typeof documents)["\nmutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {\n  updateOrCreateWheelPart(input: $input) {\n    id\n    name\n    imagePath\n    imageText\n    win\n    winText\n    winChance\n    disabled\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gameInfo {\n    gameInfo {\n      chanceToWin\n      sumOfChances\n      sumOfWinChance\n      sumOfLooseChance\n    }\n  }\n"): (typeof documents)["\n  query gameInfo {\n    gameInfo {\n      chanceToWin\n      sumOfChances\n      sumOfWinChance\n      sumOfLooseChance\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n"): (typeof documents)["\n  query wheelParts($filter: wheelPartFilter) {\n    wheelParts(filter: $filter) {\n      id\n      name\n      imagePath\n      imageText\n      win\n      winText\n      winChance\n      disabled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation startWheel{\n    startWheel {\n      isRunning\n    }\n  }\n"): (typeof documents)["\nmutation startWheel{\n    startWheel {\n      isRunning\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  mutation stopWheel {\n    stopWheel {\n      \n      isRunning\n    }\n  }\n"): (typeof documents)["\n  \n  mutation stopWheel {\n    stopWheel {\n      \n      isRunning\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nsubscription GameChanged {\n    gameChanged {\n        isRunning\n        isRoundDone\n        canToggle\n        resultId\n        date\n        lastUpdate\n    }\n  }\n"): (typeof documents)["\nsubscription GameChanged {\n    gameChanged {\n        isRunning\n        isRoundDone\n        canToggle\n        resultId\n        date\n        lastUpdate\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;