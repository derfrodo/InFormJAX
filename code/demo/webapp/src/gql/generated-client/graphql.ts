/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type DisplaySettings = {
  __typename?: 'DisplaySettings';
  showResultAfterMS: Scalars['Int'];
  showResultForMS: Scalars['Int'];
};

export type DisplaySettingsInput = {
  showResultAfterMS: Scalars['Int'];
  showResultForMS: Scalars['Int'];
};

export type GameSettingsType = {
  __typename?: 'GameSettingsType';
  chanceToWin: Scalars['Float'];
  sumOfChances: Scalars['Float'];
  sumOfLooseChance: Scalars['Float'];
  sumOfWinChance: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  toggleDisableWheelValue?: Maybe<WheelPart>;
  updateDisplaySettings?: Maybe<DisplaySettings>;
  updateOrCreateWheelPart?: Maybe<WheelPart>;
  updateWheelSettings?: Maybe<WheelSettings>;
};


export type MutationToggleDisableWheelValueArgs = {
  name: Scalars['String'];
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
  firstname?: Maybe<Scalars['String']>;
  gameSettings?: Maybe<GameSettingsType>;
  wheelParts?: Maybe<Array<WheelPart>>;
  wheelSettings?: Maybe<WheelSettings>;
};


export type QueryWheelPartsArgs = {
  filter?: InputMaybe<WheelPartFilter>;
};

export type UpdateWheelPartInput = {
  imagePath?: InputMaybe<Scalars['String']>;
  imageText?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  win: Scalars['Boolean'];
  winChance: Scalars['Float'];
  winText?: InputMaybe<Scalars['String']>;
};

export type WheelPart = {
  __typename?: 'WheelPart';
  disabled: Scalars['Boolean'];
  imagePath?: Maybe<Scalars['String']>;
  imageText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  win: Scalars['Boolean'];
  winChance: Scalars['Float'];
  winText?: Maybe<Scalars['String']>;
};

export type WheelSettings = {
  __typename?: 'WheelSettings';
  radius: Scalars['Int'];
  rotationDurationInner: Scalars['Int'];
  rotationDurationNotPlaying: Scalars['Int'];
  rotationDurationPlaying: Scalars['Int'];
};

export type WheelSettingsInput = {
  radius: Scalars['Int'];
  rotationDurationInner: Scalars['Int'];
  rotationDurationNotPlaying: Scalars['Int'];
  rotationDurationPlaying: Scalars['Int'];
};

export type WheelPartFilter = {
  disabled?: InputMaybe<Scalars['Boolean']>;
};

export type DisplaySettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type DisplaySettingsQuery = { __typename?: 'Query', displaySettings?: { __typename?: 'DisplaySettings', showResultAfterMS: number, showResultForMS: number } | null };

export type WheelSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type WheelSettingsQuery = { __typename?: 'Query', wheelSettings?: { __typename?: 'WheelSettings', radius: number, rotationDurationNotPlaying: number, rotationDurationPlaying: number, rotationDurationInner: number } | null };

export type UpdateSettingsMutationVariables = Exact<{
  input: DisplaySettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateDisplaySettings?: { __typename?: 'DisplaySettings', showResultAfterMS: number, showResultForMS: number } | null };

export type UpdateWheelSettingsMutationVariables = Exact<{
  input: WheelSettingsInput;
}>;


export type UpdateWheelSettingsMutation = { __typename?: 'Mutation', updateWheelSettings?: { __typename?: 'WheelSettings', radius: number, rotationDurationInner: number, rotationDurationNotPlaying: number, rotationDurationPlaying: number } | null };

export type ToggleDisableWheelValueMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type ToggleDisableWheelValueMutation = { __typename?: 'Mutation', toggleDisableWheelValue?: { __typename?: 'WheelPart', name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean } | null };

export type UpdateOrCreateWheelPartMutationVariables = Exact<{
  input: UpdateWheelPartInput;
}>;


export type UpdateOrCreateWheelPartMutation = { __typename?: 'Mutation', updateOrCreateWheelPart?: { __typename?: 'WheelPart', name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean } | null };

export type GameSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GameSettingsQuery = { __typename?: 'Query', gameSettings?: { __typename?: 'GameSettingsType', chanceToWin: number, sumOfChances: number, sumOfWinChance: number, sumOfLooseChance: number } | null };

export type WheelPartsQueryVariables = Exact<{
  filter?: InputMaybe<WheelPartFilter>;
}>;


export type WheelPartsQuery = { __typename?: 'Query', wheelParts?: Array<{ __typename?: 'WheelPart', name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null, winChance: number, disabled: boolean }> | null };


export const DisplaySettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DisplaySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displaySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showResultAfterMS"}},{"kind":"Field","name":{"kind":"Name","value":"showResultForMS"}}]}}]}}]} as unknown as DocumentNode<DisplaySettingsQuery, DisplaySettingsQueryVariables>;
export const WheelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wheelSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wheelSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationNotPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationInner"}}]}}]}}]} as unknown as DocumentNode<WheelSettingsQuery, WheelSettingsQueryVariables>;
export const UpdateSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DisplaySettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDisplaySettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showResultAfterMS"}},{"kind":"Field","name":{"kind":"Name","value":"showResultForMS"}}]}}]}}]} as unknown as DocumentNode<UpdateSettingsMutation, UpdateSettingsMutationVariables>;
export const UpdateWheelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWheelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WheelSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWheelSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"radius"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationInner"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationNotPlaying"}},{"kind":"Field","name":{"kind":"Name","value":"rotationDurationPlaying"}}]}}]}}]} as unknown as DocumentNode<UpdateWheelSettingsMutation, UpdateWheelSettingsMutationVariables>;
export const ToggleDisableWheelValueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleDisableWheelValue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleDisableWheelValue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<ToggleDisableWheelValueMutation, ToggleDisableWheelValueMutationVariables>;
export const UpdateOrCreateWheelPartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateOrCreateWheelPart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWheelPartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrCreateWheelPart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<UpdateOrCreateWheelPartMutation, UpdateOrCreateWheelPartMutationVariables>;
export const GameSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GameSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chanceToWin"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfChances"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfWinChance"}},{"kind":"Field","name":{"kind":"Name","value":"sumOfLooseChance"}}]}}]}}]} as unknown as DocumentNode<GameSettingsQuery, GameSettingsQueryVariables>;
export const WheelPartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wheelParts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"wheelPartFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wheelParts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}},{"kind":"Field","name":{"kind":"Name","value":"winChance"}},{"kind":"Field","name":{"kind":"Name","value":"disabled"}}]}}]}}]} as unknown as DocumentNode<WheelPartsQuery, WheelPartsQueryVariables>;