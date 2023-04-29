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

export type Query = {
  __typename?: 'Query';
  firstname?: Maybe<Scalars['String']>;
  wheelParts?: Maybe<Array<WheelPart>>;
};

export type WheelPart = {
  __typename?: 'WheelPart';
  image?: Maybe<Scalars['String']>;
  imagePath?: Maybe<Scalars['String']>;
  imageText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  win: Scalars['Boolean'];
  winText?: Maybe<Scalars['String']>;
};

export type WheelPartsQueryVariables = Exact<{ [key: string]: never; }>;


export type WheelPartsQuery = { __typename?: 'Query', wheelParts?: Array<{ __typename?: 'WheelPart', name: string, imagePath?: string | null, imageText?: string | null, win: boolean, winText?: string | null }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', firstname?: string | null };


export const WheelPartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wheelParts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wheelParts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"imageText"}},{"kind":"Field","name":{"kind":"Name","value":"win"}},{"kind":"Field","name":{"kind":"Name","value":"winText"}}]}}]}}]} as unknown as DocumentNode<WheelPartsQuery, WheelPartsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;