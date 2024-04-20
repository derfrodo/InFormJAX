/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type DisplaySettings = {
  __typename?: 'DisplaySettings';
  showResultAfterMS: Scalars['Int']['output'];
  showResultForMS: Scalars['Int']['output'];
};

export type DisplaySettingsInput = {
  showResultAfterMS: Scalars['Int']['input'];
  showResultForMS: Scalars['Int']['input'];
};

export type Game = {
  __typename?: 'Game';
  canToggle: Scalars['Boolean']['output'];
  date: Scalars['Date']['output'];
  isRoundDone: Scalars['Boolean']['output'];
  isRunning: Scalars['Boolean']['output'];
  lastUpdate: Scalars['Float']['output'];
  resultId?: Maybe<Scalars['ID']['output']>;
};

export type GameResult = {
  __typename?: 'GameResult';
  date?: Maybe<Scalars['Date']['output']>;
  result?: Maybe<WheelPart>;
};

export type GameSettingsType = {
  __typename?: 'GameSettingsType';
  chanceToWin: Scalars['Float']['output'];
  sumOfChances: Scalars['Float']['output'];
  sumOfLooseChance: Scalars['Float']['output'];
  sumOfWinChance: Scalars['Float']['output'];
};

export type GameStatistics = {
  __typename?: 'GameStatistics';
  loose?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  won?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  startWheel?: Maybe<Game>;
  stopWheel?: Maybe<Game>;
  toggleDisableWheelValue?: Maybe<WheelPart>;
  toggleWheel?: Maybe<Game>;
  updateDisplaySettings?: Maybe<DisplaySettings>;
  updateOrCreateWheelPart?: Maybe<WheelPart>;
  updateWheelSettings?: Maybe<WheelSettings>;
};


export type MutationToggleDisableWheelValueArgs = {
  name: Scalars['String']['input'];
};


export type MutationUpdateDisplaySettingsArgs = {
  input: DisplaySettingsInput;
};


export type MutationUpdateOrCreateWheelPartArgs = {
  input: UpdateWheelPartInput;
};


export type MutationUpdateWheelSettingsArgs = {
  input: WheelSettingsInput;
};

export type Query = {
  __typename?: 'Query';
  displaySettings?: Maybe<DisplaySettings>;
  game?: Maybe<Game>;
  gameSettings?: Maybe<GameSettingsType>;
  statistics?: Maybe<Statistics>;
  wheelParts?: Maybe<Array<WheelPart>>;
  wheelSettings?: Maybe<WheelSettings>;
};


export type QueryWheelPartsArgs = {
  filter?: InputMaybe<WheelPartFilter>;
};

export type Statistics = {
  __typename?: 'Statistics';
  games?: Maybe<GameStatistics>;
  results?: Maybe<Array<GameResult>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  gameChanged?: Maybe<Game>;
};

export type UpdateWheelPartInput = {
  disabled: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
  imagePath?: InputMaybe<Scalars['String']['input']>;
  imageText?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  win: Scalars['Boolean']['input'];
  winChance: Scalars['Float']['input'];
  winText?: InputMaybe<Scalars['String']['input']>;
};

export type WheelPart = {
  __typename?: 'WheelPart';
  disabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  imageText?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  win: Scalars['Boolean']['output'];
  winChance: Scalars['Float']['output'];
  winText?: Maybe<Scalars['String']['output']>;
};

export type WheelSettings = {
  __typename?: 'WheelSettings';
  minClickDelayMS: Scalars['Int']['output'];
  radius: Scalars['Int']['output'];
  rotationDurationInner: Scalars['Int']['output'];
  rotationDurationNotPlaying: Scalars['Int']['output'];
  rotationDurationPlaying: Scalars['Int']['output'];
};

export type WheelSettingsInput = {
  minClickDelayMS: Scalars['Int']['input'];
  radius: Scalars['Int']['input'];
  rotationDurationInner: Scalars['Int']['input'];
  rotationDurationNotPlaying: Scalars['Int']['input'];
  rotationDurationPlaying: Scalars['Int']['input'];
};

export type WheelPartFilter = {
  /** Set to true, to remove disabled items from result */
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DisplaySettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type DisplaySettingsQuery = { __typename?: 'Query', displaySettings?: { __typename?: 'DisplaySettings', showResultAfterMS: number, showResultForMS: number } | null };

export type WheelSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type WheelSettingsQuery = { __typename?: 'Query', wheelSettings?: { __typename?: 'WheelSettings', radius: number, rotationDurationNotPlaying: number, rotationDurationPlaying: number, rotationDurationInner: number, minClickDelayMS: number } | null };

export type UpdateSettingsMutationVariables = Exact<{
  input: DisplaySettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateDisplaySettings?: { __typename?: 'DisplaySettings', showResultAfterMS: number, showResultForMS: number } | null };

export type UpdateWheelSettingsMutationVariables = Exact<{
  input: WheelSettingsInput;
}>;


export type UpdateWheelSettingsMutation = { __typename?: 'Mutation', updateWheelSettings?: { __typename?: 'WheelSettings', radius: number, rotationDurationInner: number, rotationDurationNotPlaying: number, rotationDurationPlaying: number, minClickDelayMS: number } | null };

export type ToggleDisableWheelValueMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type ToggleDisableWheelValueMutation = { __typename?: 'Mutation', toggleDisableWheelValue?: { __typename?: 'WheelPart', id: string, name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean } | null };

export type UpdateOrCreateWheelPartMutationVariables = Exact<{
  input: UpdateWheelPartInput;
}>;


export type UpdateOrCreateWheelPartMutation = { __typename?: 'Mutation', updateOrCreateWheelPart?: { __typename?: 'WheelPart', id: string, name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean } | null };

export type GameSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GameSettingsQuery = { __typename?: 'Query', gameSettings?: { __typename?: 'GameSettingsType', chanceToWin: number, sumOfChances: number, sumOfWinChance: number, sumOfLooseChance: number } | null };

export type WheelPartsQueryVariables = Exact<{
  filter?: InputMaybe<WheelPartFilter>;
}>;


export type WheelPartsQuery = { __typename?: 'Query', wheelParts?: Array<{ __typename?: 'WheelPart', id: string, name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean }> | null };

export type StartWheelMutationVariables = Exact<{ [key: string]: never; }>;


export type StartWheelMutation = { __typename?: 'Mutation', startWheel?: { __typename?: 'Game', isRunning: boolean } | null };

export type StopWheelMutationVariables = Exact<{ [key: string]: never; }>;


export type StopWheelMutation = { __typename?: 'Mutation', stopWheel?: { __typename?: 'Game', isRunning: boolean } | null };

export type GameChangedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GameChangedSubscription = { __typename?: 'Subscription', gameChanged?: { __typename?: 'Game', isRunning: boolean, isRoundDone: boolean, canToggle: boolean, resultId?: string | null, date: any, lastUpdate: number } | null };


export const DisplaySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DisplaySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displaySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showResultAfterMS"}},{"kind":"Field","name":{"kind":"Name","value":"showResultForMS"}}]}}]}}]} as unknown as DocumentNode<DisplaySettingsQuery, DisplaySettingsQueryVariables>;
export const WheelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wheelSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wheelSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationNotPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationInner"}},{"kind":"Field","name":{"kind":"Name","value":"minClickDelayMS"}}]}}]}}]} as unknown as DocumentNode<WheelSettingsQuery, WheelSettingsQueryVariables>;
export const UpdateSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DisplaySettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDisplaySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showResultAfterMS"}},{"kind":"Field","name":{"kind":"Name","value":"showResultForMS"}}]}}]}}]} as unknown as DocumentNode<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const UpdateWheelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWheelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WheelSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWheelSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationInner"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationNotPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"minClickDelayMS"}}]}}]}}]} as unknown as DocumentNode<UpdateWheelSettingsMutation, UpdateWheelSettingsMutationVariables>;
export const ToggleDisableWheelValueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleDisableWheelValue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleDisableWheelValue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<ToggleDisableWheelValueMutation, ToggleDisableWheelValueMutationVariables>;
export const UpdateOrCreateWheelPartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOrCreateWheelPart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWheelPartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrCreateWheelPart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<UpdateOrCreateWheelPartMutation, UpdateOrCreateWheelPartMutationVariables>;
export const GameSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GameSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chanceToWin"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfChances"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfWinChance"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfLooseChance"}}]}}]}}]} as unknown as DocumentNode<GameSettingsQuery, GameSettingsQueryVariables>;
export const WheelPartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wheelParts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"wheelPartFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wheelParts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<WheelPartsQuery, WheelPartsQueryVariables>;
export const StartWheelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startWheel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startWheel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRunning"}}]}}]}}]} as unknown as DocumentNode<StartWheelMutation, StartWheelMutationVariables>;
export const StopWheelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopWheel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopWheel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRunning"}}]}}]}}]} as unknown as DocumentNode<StopWheelMutation, StopWheelMutationVariables>;
export const GameChangedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"GameChanged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameChanged"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRunning"}},{"kind":"Field","name":{"kind":"Name","value":"isRoundDone"}},{"kind":"Field","name":{"kind":"Name","value":"canToggle"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdate"}}]}}]}}]} as unknown as DocumentNode<GameChangedSubscription, GameChangedSubscriptionVariables>;