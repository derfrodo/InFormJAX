import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Mutation = {
  __typename?: 'Mutation';
  toggleDisableWheelValue?: Maybe<WheelPart>;
  updateDisplaySettings?: Maybe<DisplaySettings>;
  updateWheelSettings?: Maybe<WheelSettings>;
};


export type MutationToggleDisableWheelValueArgs = {
  name: Scalars['String'];
};


export type MutationUpdateDisplaySettingsArgs = {
  input: DisplaySettingsInput;
};


export type MutationUpdateWheelSettingsArgs = {
  input: WheelSettingsInput;
};

export type Query = {
  __typename?: 'Query';
  displaySettings?: Maybe<DisplaySettings>;
  firstname?: Maybe<Scalars['String']>;
  sessionWheelSettings?: Maybe<WheelSettings>;
  wheelParts?: Maybe<Array<WheelPart>>;
};


export type QueryWheelPartsArgs = {
  filter?: InputMaybe<WheelPartFilter>;
};

export type WheelPart = {
  __typename?: 'WheelPart';
  disabled: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  imagePath?: Maybe<Scalars['String']>;
  imageText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  win: Scalars['Boolean'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DisplaySettings: ResolverTypeWrapper<DisplaySettings>;
  DisplaySettingsInput: DisplaySettingsInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  WheelPart: ResolverTypeWrapper<WheelPart>;
  WheelSettings: ResolverTypeWrapper<WheelSettings>;
  WheelSettingsInput: WheelSettingsInput;
  wheelPartFilter: WheelPartFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DisplaySettings: DisplaySettings;
  DisplaySettingsInput: DisplaySettingsInput;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  WheelPart: WheelPart;
  WheelSettings: WheelSettings;
  WheelSettingsInput: WheelSettingsInput;
  wheelPartFilter: WheelPartFilter;
};

export type DisplaySettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisplaySettings'] = ResolversParentTypes['DisplaySettings']> = {
  showResultAfterMS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  showResultForMS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  toggleDisableWheelValue?: Resolver<Maybe<ResolversTypes['WheelPart']>, ParentType, ContextType, RequireFields<MutationToggleDisableWheelValueArgs, 'name'>>;
  updateDisplaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType, RequireFields<MutationUpdateDisplaySettingsArgs, 'input'>>;
  updateWheelSettings?: Resolver<Maybe<ResolversTypes['WheelSettings']>, ParentType, ContextType, RequireFields<MutationUpdateWheelSettingsArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  displaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sessionWheelSettings?: Resolver<Maybe<ResolversTypes['WheelSettings']>, ParentType, ContextType>;
  wheelParts?: Resolver<Maybe<Array<ResolversTypes['WheelPart']>>, ParentType, ContextType, Partial<QueryWheelPartsArgs>>;
};

export type WheelPartResolvers<ContextType = any, ParentType extends ResolversParentTypes['WheelPart'] = ResolversParentTypes['WheelPart']> = {
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imagePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  win?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  winText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WheelSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WheelSettings'] = ResolversParentTypes['WheelSettings']> = {
  radius?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationInner?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationNotPlaying?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationPlaying?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DisplaySettings?: DisplaySettingsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  WheelPart?: WheelPartResolvers<ContextType>;
  WheelSettings?: WheelSettingsResolvers<ContextType>;
};

