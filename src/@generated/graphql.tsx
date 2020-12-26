import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  sayHello?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  projects: Array<Maybe<Project>>;
  allCounts: Array<Count>;
  projectCount: Count;
  issue: Issue;
  issues: Array<Issue>;
  activeKeys: Array<ApiKey>;
};


export type QueryProjectArgs = {
  name: Scalars['String'];
};


export type QueryProjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryIssueArgs = {
  issueId: Scalars['String'];
};


export type QueryIssuesArgs = {
  projectId: Scalars['String'];
};


export type QueryActiveKeysArgs = {
  project: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  token?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<User>;
  login?: Maybe<User>;
  validate?: Maybe<User>;
  newProject?: Maybe<Project>;
  deleteProject: Scalars['Boolean'];
  addApiKey: ApiKey;
  revokeKey: ApiKey;
};


export type MutationRegisterArgs = {
  user: UserInput;
  genToken?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  user: UserLogin;
  genToken?: Maybe<Scalars['Boolean']>;
};


export type MutationValidateArgs = {
  token: Scalars['String'];
};


export type MutationNewProjectArgs = {
  projectInfo: ProjectInput;
};


export type MutationDeleteProjectArgs = {
  name: Scalars['String'];
};


export type MutationAddApiKeyArgs = {
  config?: Maybe<ApiKeyInput>;
};


export type MutationRevokeKeyArgs = {
  id: Scalars['ID'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  createdBy: Scalars['ID'];
  name: Scalars['String'];
  language: Scalars['String'];
};

export type Paging = {
  __typename?: 'Paging';
  current: Scalars['Int'];
  count: Scalars['Int'];
  offset: Scalars['Int'];
};

export type ProjectInput = {
  createdBy: Scalars['ID'];
  name: Scalars['String'];
  language: Scalars['String'];
};

export type Count = {
  __typename?: 'Count';
  type: Scalars['String'];
  total: Scalars['Int'];
};

export enum IssueType {
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}

export type Issue = {
  __typename?: 'Issue';
  id: Scalars['ID'];
  title: Scalars['String'];
  issueType: IssueType;
  open: Scalars['Boolean'];
  stack: Scalars['String'];
  extra?: Maybe<Scalars['String']>;
  handled: Scalars['Boolean'];
};

export type ApiKey = {
  __typename?: 'ApiKey';
  id: Scalars['ID'];
  name: Scalars['String'];
  project: Scalars['String'];
  environment: Scalars['String'];
  key: Scalars['String'];
};

export type ApiKeyInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  project: Scalars['String'];
  environment: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserLogin: UserLogin;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Project: ResolverTypeWrapper<Project>;
  Paging: ResolverTypeWrapper<Paging>;
  ProjectInput: ProjectInput;
  Count: ResolverTypeWrapper<Count>;
  IssueType: IssueType;
  Issue: ResolverTypeWrapper<Issue>;
  ApiKey: ResolverTypeWrapper<ApiKey>;
  ApiKeyInput: ApiKeyInput;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  User: User;
  UserInput: UserInput;
  UserLogin: UserLogin;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Project: Project;
  Paging: Paging;
  ProjectInput: ProjectInput;
  Count: Count;
  Issue: Issue;
  ApiKey: ApiKey;
  ApiKeyInput: ApiKeyInput;
  Upload: Scalars['Upload'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  sayHello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'name'>>;
  projects?: Resolver<Array<Maybe<ResolversTypes['Project']>>, ParentType, ContextType, RequireFields<QueryProjectsArgs, never>>;
  allCounts?: Resolver<Array<ResolversTypes['Count']>, ParentType, ContextType>;
  projectCount?: Resolver<ResolversTypes['Count'], ParentType, ContextType>;
  issue?: Resolver<ResolversTypes['Issue'], ParentType, ContextType, RequireFields<QueryIssueArgs, 'issueId'>>;
  issues?: Resolver<Array<ResolversTypes['Issue']>, ParentType, ContextType, RequireFields<QueryIssuesArgs, 'projectId'>>;
  activeKeys?: Resolver<Array<ResolversTypes['ApiKey']>, ParentType, ContextType, RequireFields<QueryActiveKeysArgs, 'project'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'user'>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'user'>>;
  validate?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationValidateArgs, 'token'>>;
  newProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationNewProjectArgs, 'projectInfo'>>;
  deleteProject?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'name'>>;
  addApiKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType, RequireFields<MutationAddApiKeyArgs, never>>;
  revokeKey?: Resolver<ResolversTypes['ApiKey'], ParentType, ContextType, RequireFields<MutationRevokeKeyArgs, 'id'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paging'] = ResolversParentTypes['Paging']> = {
  current?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Count'] = ResolversParentTypes['Count']> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IssueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Issue'] = ResolversParentTypes['Issue']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issueType?: Resolver<ResolversTypes['IssueType'], ParentType, ContextType>;
  open?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  stack?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extra?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  handled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApiKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApiKey'] = ResolversParentTypes['ApiKey']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  environment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Paging?: PagingResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  Issue?: IssueResolvers<ContextType>;
  ApiKey?: ApiKeyResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
