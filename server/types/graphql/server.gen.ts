import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Base64Url } from "./Base64Url";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: UnwrapPromise<ResolverTypeWrapper<TParent>>, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promisable<TResult>;
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Base64Url: Base64Url;
  DateIso: any;
  DateTimeIso: any;
};

export type Account = {
  __typename: 'Account';
  accountType: AccountType;
  currentBalance: Scalars['Float'];
  dailyBalance: Array<DailyBalance>;
  entity: Entity;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  institution: Institution;
  lastRefreshed?: Maybe<Scalars['DateTimeIso']>;
  monthlyBalance: Array<MonthlyBalance>;
  name: Scalars['String'];
  number: Scalars['String'];
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
};


export type AccountDailyBalanceArgs = {
  dateRange: DateRange;
};


export type AccountMonthlyBalanceArgs = {
  dateRange: DateRange;
};


export type AccountTransactionGroupsArgs = {
  dateRange: DateRange;
  groupBy: GroupBy;
};


export type AccountTransactionsArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  dateRange: DateRange;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']>;
};

export enum AccountType {
  Checking = 'Checking',
  Credit = 'Credit',
  Investment = 'Investment',
  Loan = 'Loan',
  Savings = 'Savings'
}

export type Budget = {
  __typename: 'Budget';
  category: Category;
  currentBudgeted: Scalars['Float'];
  entity: Entity;
  id: Scalars['ID'];
  performance: Array<Performance>;
};


export type BudgetPerformanceArgs = {
  groupBy: GroupBy;
};

export type Category = {
  __typename: 'Category';
  budget?: Maybe<Budget>;
  categoryId: Scalars['ID'];
  categoryType: CategoryType;
  change: CategoryChange;
  count: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  total: Scalars['Float'];
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
};


export type CategoryTransactionGroupsArgs = {
  groupBy: GroupBy;
};


export type CategoryTransactionsArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type CategoryChange = {
  __typename: 'CategoryChange';
  category: Category;
  changePercent?: Maybe<Scalars['Float']>;
  currentDateRange: DateRangeValue;
  currentTotal: Scalars['Float'];
  id: Scalars['ID'];
  previousDateRange: DateRangeValue;
  previousTotal: Scalars['Float'];
  proratedChangePercent?: Maybe<Scalars['Float']>;
  proratedPreviousDateRange: DateRangeValue;
  proratedPreviousTotal: Scalars['Float'];
};

export enum CategoryType {
  Expense = 'Expense',
  Income = 'Income'
}

export type DailyBalance = {
  __typename: 'DailyBalance';
  balance: Scalars['Float'];
  date: Scalars['DateIso'];
  id: Scalars['ID'];
};

export type DateRange = {
  end: Scalars['DateIso'];
  start: Scalars['DateIso'];
};

export type DateRangeValue = {
  __typename: 'DateRangeValue';
  end: Scalars['DateIso'];
  id: Scalars['ID'];
  start: Scalars['DateIso'];
};

export type Entity = {
  __typename: 'Entity';
  accounts: Array<Account>;
  categories: Array<Category>;
  category: Category;
  currentBalance: Scalars['Float'];
  dailyBalance: Array<DailyBalance>;
  id: Scalars['ID'];
  monthlyBalance: Array<MonthlyBalance>;
  name: Scalars['String'];
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
};


export type EntityCategoriesArgs = {
  changeThreshold?: InputMaybe<Scalars['Float']>;
  dateRange: DateRange;
};


export type EntityCategoryArgs = {
  categoryId: Scalars['ID'];
  dateRange: DateRange;
};


export type EntityDailyBalanceArgs = {
  dateRange: DateRange;
};


export type EntityMonthlyBalanceArgs = {
  dateRange: DateRange;
};


export type EntityTransactionGroupsArgs = {
  dateRange: DateRange;
  groupBy: GroupBy;
};


export type EntityTransactionsArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  dateRange: DateRange;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']>;
};

export enum GroupBy {
  Month = 'Month',
  Week = 'Week',
  Weekday = 'Weekday',
  Year = 'Year'
}

export type IdOnly = {
  id: Scalars['ID'];
};

export type IdOrAddress = {
  address?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type IdOrName = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Institution = {
  __typename: 'Institution';
  accounts: Array<Account>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MonthlyBalance = {
  __typename: 'MonthlyBalance';
  balance: Scalars['Float'];
  id: Scalars['ID'];
  month: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  addCategory: Category;
  addVendor: Vendor;
  setCategory?: Maybe<Transaction>;
  setVendor?: Maybe<Transaction>;
};


export type MutationAddCategoryArgs = {
  categoryType: CategoryType;
  name: Scalars['String'];
};


export type MutationAddVendorArgs = {
  name: Scalars['String'];
};


export type MutationSetCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  transactionId: Scalars['ID'];
};


export type MutationSetVendorArgs = {
  transactionId: Scalars['ID'];
  vendorId?: InputMaybe<Scalars['ID']>;
};

export type Pagination = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type Performance = {
  __typename: 'Performance';
  budgeted: Scalars['Float'];
  id: Scalars['ID'];
  month: Scalars['String'];
  spent: Scalars['Float'];
};

export type Query = {
  __typename: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  budget?: Maybe<Budget>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  currentBalance: Scalars['Float'];
  dailyBalance: Array<DailyBalance>;
  entities: Array<Entity>;
  entity?: Maybe<Entity>;
  institution?: Maybe<Institution>;
  institutions: Array<Institution>;
  lastRefreshed: Scalars['DateIso'];
  monthlyBalance: Array<MonthlyBalance>;
  transaction?: Maybe<Transaction>;
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
  vendor?: Maybe<Vendor>;
  vendors: Array<Vendor>;
};


export type QueryAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryBudgetArgs = {
  categoryId: Scalars['ID'];
  entityId: Scalars['ID'];
};


export type QueryCategoriesArgs = {
  changeThreshold?: InputMaybe<Scalars['Float']>;
  dateRange: DateRange;
};


export type QueryCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  dateRange?: InputMaybe<DateRange>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryDailyBalanceArgs = {
  dateRange: DateRange;
};


export type QueryEntityArgs = {
  entityId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryInstitutionArgs = {
  institutionId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryMonthlyBalanceArgs = {
  dateRange: DateRange;
};


export type QueryTransactionArgs = {
  transactionId: Scalars['ID'];
};


export type QueryTransactionGroupsArgs = {
  dateRange: DateRange;
  groupBy: GroupBy;
};


export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']>;
  dateRange: DateRange;
  entityId?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryVendorArgs = {
  name?: InputMaybe<Scalars['String']>;
  vendorId?: InputMaybe<Scalars['ID']>;
};

export type Scope = {
  accountId?: InputMaybe<Scalars['ID']>;
  budgetId?: InputMaybe<Scalars['ID']>;
  categoryId?: InputMaybe<Scalars['ID']>;
  entityId?: InputMaybe<Scalars['ID']>;
  institutionId?: InputMaybe<Scalars['ID']>;
  transactionId?: InputMaybe<Scalars['ID']>;
  vendorId?: InputMaybe<Scalars['ID']>;
};

export type Transaction = {
  __typename: 'Transaction';
  account: Account;
  addedAt: Scalars['DateTimeIso'];
  amount: Scalars['Float'];
  category?: Maybe<Category>;
  date: Scalars['DateIso'];
  description: Scalars['String'];
  id: Scalars['ID'];
  pending: Scalars['Boolean'];
  vendor?: Maybe<Vendor>;
};

export type TransactionGroup = {
  __typename: 'TransactionGroup';
  count: Scalars['Int'];
  end: Scalars['DateIso'];
  groupIdentifier: Scalars['String'];
  groupIndex: Scalars['Int'];
  groupedBy: GroupBy;
  id: Scalars['ID'];
  start: Scalars['DateIso'];
  total: Scalars['Float'];
  totalExpenses: Scalars['Float'];
  totalIncome: Scalars['Float'];
  transactions: Array<Transaction>;
};


export type TransactionGroupTransactionsArgs = {
  categoryId?: InputMaybe<Scalars['ID']>;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']>;
};

export type Vendor = {
  __typename: 'Vendor';
  id: Scalars['ID'];
  image?: Maybe<Scalars['Base64Url']>;
  name: Scalars['String'];
  total: Scalars['Float'];
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
};


export type VendorTotalArgs = {
  dateRange: DateRange;
};


export type VendorTransactionGroupsArgs = {
  dateRange: DateRange;
  groupBy: GroupBy;
};


export type VendorTransactionsArgs = {
  dateRange: DateRange;
  pagination?: InputMaybe<Pagination>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promisable<T extends { id: string, __typename: string } ? { id: string; scope: Scope } | null : T>;
export type Promisable<T> = Promise<T> | T
;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  AccountType: AccountType;
  Base64Url: ResolverTypeWrapper<Scalars['Base64Url']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Budget: ResolverTypeWrapper<Budget>;
  Category: ResolverTypeWrapper<Category>;
  CategoryChange: ResolverTypeWrapper<CategoryChange>;
  CategoryType: CategoryType;
  DailyBalance: ResolverTypeWrapper<DailyBalance>;
  DateIso: ResolverTypeWrapper<Scalars['DateIso']>;
  DateRange: DateRange;
  DateRangeValue: ResolverTypeWrapper<DateRangeValue>;
  DateTimeIso: ResolverTypeWrapper<Scalars['DateTimeIso']>;
  Entity: ResolverTypeWrapper<Entity>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GroupBy: GroupBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IdOnly: IdOnly;
  IdOrAddress: IdOrAddress;
  IdOrName: IdOrName;
  Institution: ResolverTypeWrapper<Institution>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MonthlyBalance: ResolverTypeWrapper<MonthlyBalance>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: Pagination;
  Performance: ResolverTypeWrapper<Performance>;
  Query: ResolverTypeWrapper<{}>;
  Scope: Scope;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionGroup: ResolverTypeWrapper<TransactionGroup>;
  Vendor: ResolverTypeWrapper<Vendor>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Base64Url: Scalars['Base64Url'];
  Boolean: Scalars['Boolean'];
  Budget: Budget;
  Category: Category;
  CategoryChange: CategoryChange;
  DailyBalance: DailyBalance;
  DateIso: Scalars['DateIso'];
  DateRange: DateRange;
  DateRangeValue: DateRangeValue;
  DateTimeIso: Scalars['DateTimeIso'];
  Entity: Entity;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  IdOnly: IdOnly;
  IdOrAddress: IdOrAddress;
  IdOrName: IdOrName;
  Institution: Institution;
  Int: Scalars['Int'];
  MonthlyBalance: MonthlyBalance;
  Mutation: {};
  Pagination: Pagination;
  Performance: Performance;
  Query: {};
  Scope: Scope;
  String: Scalars['String'];
  Transaction: Transaction;
  TransactionGroup: TransactionGroup;
  Vendor: Vendor;
}>;

export type AccountResolvers<ContextType = any, ParentType = ResolversParentTypes['Account']> = ResolversObject<{
  accountType?: Resolver<ResolversTypes['AccountType'], ParentType, ContextType>;
  currentBalance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dailyBalance?: Resolver<Array<ResolversTypes['DailyBalance']>, ParentType, ContextType, RequireFields<AccountDailyBalanceArgs, 'dateRange'>>;
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>;
  externalId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['Institution'], ParentType, ContextType>;
  lastRefreshed?: Resolver<Maybe<ResolversTypes['DateTimeIso']>, ParentType, ContextType>;
  monthlyBalance?: Resolver<Array<ResolversTypes['MonthlyBalance']>, ParentType, ContextType, RequireFields<AccountMonthlyBalanceArgs, 'dateRange'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionGroups?: Resolver<Array<ResolversTypes['TransactionGroup']>, ParentType, ContextType, RequireFields<AccountTransactionGroupsArgs, 'dateRange' | 'groupBy'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<AccountTransactionsArgs, 'dateRange'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Base64UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Base64Url'], any> {
  name: 'Base64Url';
}

export type BudgetResolvers<ContextType = any, ParentType = ResolversParentTypes['Budget']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  currentBudgeted?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  entity?: Resolver<ResolversTypes['Entity'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  performance?: Resolver<Array<ResolversTypes['Performance']>, ParentType, ContextType, RequireFields<BudgetPerformanceArgs, 'groupBy'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType = ResolversParentTypes['Category']> = ResolversObject<{
  budget?: Resolver<Maybe<ResolversTypes['Budget']>, ParentType, ContextType>;
  categoryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  categoryType?: Resolver<ResolversTypes['CategoryType'], ParentType, ContextType>;
  change?: Resolver<ResolversTypes['CategoryChange'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  transactionGroups?: Resolver<Array<ResolversTypes['TransactionGroup']>, ParentType, ContextType, RequireFields<CategoryTransactionGroupsArgs, 'groupBy'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<CategoryTransactionsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryChangeResolvers<ContextType = any, ParentType = ResolversParentTypes['CategoryChange']> = ResolversObject<{
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  changePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currentDateRange?: Resolver<ResolversTypes['DateRangeValue'], ParentType, ContextType>;
  currentTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  previousDateRange?: Resolver<ResolversTypes['DateRangeValue'], ParentType, ContextType>;
  previousTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  proratedChangePercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  proratedPreviousDateRange?: Resolver<ResolversTypes['DateRangeValue'], ParentType, ContextType>;
  proratedPreviousTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DailyBalanceResolvers<ContextType = any, ParentType = ResolversParentTypes['DailyBalance']> = ResolversObject<{
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateIso'], any> {
  name: 'DateIso';
}

export type DateRangeValueResolvers<ContextType = any, ParentType = ResolversParentTypes['DateRangeValue']> = ResolversObject<{
  end?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTimeIso'], any> {
  name: 'DateTimeIso';
}

export type EntityResolvers<ContextType = any, ParentType = ResolversParentTypes['Entity']> = ResolversObject<{
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<EntityCategoriesArgs, 'dateRange'>>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<EntityCategoryArgs, 'categoryId' | 'dateRange'>>;
  currentBalance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dailyBalance?: Resolver<Array<ResolversTypes['DailyBalance']>, ParentType, ContextType, RequireFields<EntityDailyBalanceArgs, 'dateRange'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  monthlyBalance?: Resolver<Array<ResolversTypes['MonthlyBalance']>, ParentType, ContextType, RequireFields<EntityMonthlyBalanceArgs, 'dateRange'>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionGroups?: Resolver<Array<ResolversTypes['TransactionGroup']>, ParentType, ContextType, RequireFields<EntityTransactionGroupsArgs, 'dateRange' | 'groupBy'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<EntityTransactionsArgs, 'dateRange'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InstitutionResolvers<ContextType = any, ParentType = ResolversParentTypes['Institution']> = ResolversObject<{
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MonthlyBalanceResolvers<ContextType = any, ParentType = ResolversParentTypes['MonthlyBalance']> = ResolversObject<{
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationAddCategoryArgs, 'categoryType' | 'name'>>;
  addVendor?: Resolver<ResolversTypes['Vendor'], ParentType, ContextType, RequireFields<MutationAddVendorArgs, 'name'>>;
  setCategory?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<MutationSetCategoryArgs, 'transactionId'>>;
  setVendor?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<MutationSetVendorArgs, 'transactionId'>>;
}>;

export type PerformanceResolvers<ContextType = any, ParentType = ResolversParentTypes['Performance']> = ResolversObject<{
  budgeted?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  month?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, Partial<QueryAccountArgs>>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  budget?: Resolver<Maybe<ResolversTypes['Budget']>, ParentType, ContextType, RequireFields<QueryBudgetArgs, 'categoryId' | 'entityId'>>;
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCategoriesArgs, 'dateRange'>>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, Partial<QueryCategoryArgs>>;
  currentBalance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  dailyBalance?: Resolver<Array<ResolversTypes['DailyBalance']>, ParentType, ContextType, RequireFields<QueryDailyBalanceArgs, 'dateRange'>>;
  entities?: Resolver<Array<ResolversTypes['Entity']>, ParentType, ContextType>;
  entity?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType, Partial<QueryEntityArgs>>;
  institution?: Resolver<Maybe<ResolversTypes['Institution']>, ParentType, ContextType, Partial<QueryInstitutionArgs>>;
  institutions?: Resolver<Array<ResolversTypes['Institution']>, ParentType, ContextType>;
  lastRefreshed?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  monthlyBalance?: Resolver<Array<ResolversTypes['MonthlyBalance']>, ParentType, ContextType, RequireFields<QueryMonthlyBalanceArgs, 'dateRange'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'transactionId'>>;
  transactionGroups?: Resolver<Array<ResolversTypes['TransactionGroup']>, ParentType, ContextType, RequireFields<QueryTransactionGroupsArgs, 'dateRange' | 'groupBy'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionsArgs, 'dateRange'>>;
  vendor?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType, Partial<QueryVendorArgs>>;
  vendors?: Resolver<Array<ResolversTypes['Vendor']>, ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = any, ParentType = ResolversParentTypes['Transaction']> = ResolversObject<{
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  addedAt?: Resolver<ResolversTypes['DateTimeIso'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pending?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  vendor?: Resolver<Maybe<ResolversTypes['Vendor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionGroupResolvers<ContextType = any, ParentType = ResolversParentTypes['TransactionGroup']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  groupIdentifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  groupIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  groupedBy?: Resolver<ResolversTypes['GroupBy'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['DateIso'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalExpenses?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalIncome?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, Partial<TransactionGroupTransactionsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VendorResolvers<ContextType = any, ParentType = ResolversParentTypes['Vendor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Base64Url']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<VendorTotalArgs, 'dateRange'>>;
  transactionGroups?: Resolver<Array<ResolversTypes['TransactionGroup']>, ParentType, ContextType, RequireFields<VendorTransactionGroupsArgs, 'dateRange' | 'groupBy'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<VendorTransactionsArgs, 'dateRange'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Base64Url?: GraphQLScalarType;
  Budget?: BudgetResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryChange?: CategoryChangeResolvers<ContextType>;
  DailyBalance?: DailyBalanceResolvers<ContextType>;
  DateIso?: GraphQLScalarType;
  DateRangeValue?: DateRangeValueResolvers<ContextType>;
  DateTimeIso?: GraphQLScalarType;
  Entity?: EntityResolvers<ContextType>;
  Institution?: InstitutionResolvers<ContextType>;
  MonthlyBalance?: MonthlyBalanceResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Performance?: PerformanceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionGroup?: TransactionGroupResolvers<ContextType>;
  Vendor?: VendorResolvers<ContextType>;
}>;

