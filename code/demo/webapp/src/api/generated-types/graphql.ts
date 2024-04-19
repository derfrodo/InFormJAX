import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export type GameSettingsType = {
  __typename?: 'GameSettingsType';
  chanceToWin: Scalars['Float']['output'];
  sumOfChances: Scalars['Float']['output'];
  sumOfLooseChance: Scalars['Float']['output'];
  sumOfWinChance: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  toggleDisableWheelValue?: Maybe<WheelPart>;
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
  firstname?: Maybe<Scalars['String']['output']>;
  gameSettings?: Maybe<GameSettingsType>;
  wheelParts?: Maybe<Array<WheelPart>>;
  wheelSettings?: Maybe<WheelSettings>;
};


export type QueryWheelPartsArgs = {
  filter?: InputMaybe<WheelPartFilter>;
};

export type UpdateWheelPartInput = {
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
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DisplaySettings: ResolverTypeWrapper<DisplaySettings>;
  DisplaySettingsInput: DisplaySettingsInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GameSettingsType: ResolverTypeWrapper<GameSettingsType>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateWheelPartInput: UpdateWheelPartInput;
  WheelPart: ResolverTypeWrapper<WheelPart>;
  WheelSettings: ResolverTypeWrapper<WheelSettings>;
  WheelSettingsInput: WheelSettingsInput;
  wheelPartFilter: WheelPartFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DisplaySettings: DisplaySettings;
  DisplaySettingsInput: DisplaySettingsInput;
  Float: Scalars['Float']['output'];
  GameSettingsType: GameSettingsType;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  UpdateWheelPartInput: UpdateWheelPartInput;
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

export type GameSettingsTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameSettingsType'] = ResolversParentTypes['GameSettingsType']> = {
  chanceToWin?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sumOfChances?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sumOfLooseChance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sumOfWinChance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  toggleDisableWheelValue?: Resolver<Maybe<ResolversTypes['WheelPart']>, ParentType, ContextType, RequireFields<MutationToggleDisableWheelValueArgs, 'name'>>;
  updateDisplaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType, RequireFields<MutationUpdateDisplaySettingsArgs, 'input'>>;
  updateOrCreateWheelPart?: Resolver<Maybe<ResolversTypes['WheelPart']>, ParentType, ContextType, RequireFields<MutationUpdateOrCreateWheelPartArgs, 'input'>>;
  updateWheelSettings?: Resolver<Maybe<ResolversTypes['WheelSettings']>, ParentType, ContextType, RequireFields<MutationUpdateWheelSettingsArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  displaySettings?: Resolver<Maybe<ResolversTypes['DisplaySettings']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gameSettings?: Resolver<Maybe<ResolversTypes['GameSettingsType']>, ParentType, ContextType>;
  wheelParts?: Resolver<Maybe<Array<ResolversTypes['WheelPart']>>, ParentType, ContextType, Partial<QueryWheelPartsArgs>>;
  wheelSettings?: Resolver<Maybe<ResolversTypes['WheelSettings']>, ParentType, ContextType>;
};

export type WheelPartResolvers<ContextType = any, ParentType extends ResolversParentTypes['WheelPart'] = ResolversParentTypes['WheelPart']> = {
  disabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  imagePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  win?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  winChance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  winText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WheelSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['WheelSettings'] = ResolversParentTypes['WheelSettings']> = {
  minClickDelayMS?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  radius?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationInner?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationNotPlaying?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rotationDurationPlaying?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DisplaySettings?: DisplaySettingsResolvers<ContextType>;
  GameSettingsType?: GameSettingsTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  WheelPart?: WheelPartResolvers<ContextType>;
  WheelSettings?: WheelSettingsResolvers<ContextType>;
};

