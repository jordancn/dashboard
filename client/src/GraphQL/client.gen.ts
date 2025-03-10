import { Base64Url } from "./Base64Url";
import { DateIso } from "@/Utils/date-iso";
import { DateTimeIso } from "@/Utils/date-time-iso";
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Base64Url: { input: Base64Url; output: Base64Url; }
  DateIso: { input: DateIso; output: DateIso; }
  DateTimeIso: { input: DateTimeIso; output: DateTimeIso; }
};

export type Account = {
  __typename?: 'Account';
  accountType: AccountType;
  currentBalance: Scalars['Float']['output'];
  dailyBalance: Array<DailyBalance>;
  entity: Entity;
  externalId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  institution: Institution;
  lastRefreshed?: Maybe<Scalars['DateTimeIso']['output']>;
  monthlyBalance: Array<MonthlyBalance>;
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
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
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  dateRange: DateRange;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export enum AccountType {
  Checking = 'Checking',
  Credit = 'Credit',
  Investment = 'Investment',
  Loan = 'Loan',
  Savings = 'Savings'
}

export type Budget = {
  __typename?: 'Budget';
  category: Category;
  currentBudgeted: Scalars['Float']['output'];
  entity: Entity;
  id: Scalars['ID']['output'];
  performance: Array<Performance>;
};


export type BudgetPerformanceArgs = {
  groupBy: GroupBy;
};

export type Category = {
  __typename?: 'Category';
  budget?: Maybe<Budget>;
  categoryId: Scalars['ID']['output'];
  categoryType: CategoryType;
  change: CategoryChange;
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  total: Scalars['Float']['output'];
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
  __typename?: 'CategoryChange';
  category: Category;
  changePercent?: Maybe<Scalars['Float']['output']>;
  currentDateRange: DateRangeValue;
  currentTotal: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  previousDateRange: DateRangeValue;
  previousTotal: Scalars['Float']['output'];
  proratedChangePercent?: Maybe<Scalars['Float']['output']>;
  proratedPreviousDateRange: DateRangeValue;
  proratedPreviousTotal: Scalars['Float']['output'];
};

export enum CategoryType {
  Expense = 'Expense',
  Income = 'Income'
}

export type DailyBalance = {
  __typename?: 'DailyBalance';
  balance: Scalars['Float']['output'];
  date: Scalars['DateIso']['output'];
  id: Scalars['ID']['output'];
};

export type DateRange = {
  end: Scalars['DateIso']['input'];
  start: Scalars['DateIso']['input'];
};

export type DateRangeValue = {
  __typename?: 'DateRangeValue';
  end: Scalars['DateIso']['output'];
  id: Scalars['ID']['output'];
  start: Scalars['DateIso']['output'];
};

export type Entity = {
  __typename?: 'Entity';
  accounts: Array<Account>;
  categories: Array<Category>;
  category: Category;
  currentBalance: Scalars['Float']['output'];
  dailyBalance: Array<DailyBalance>;
  id: Scalars['ID']['output'];
  monthlyBalance: Array<MonthlyBalance>;
  name: Scalars['String']['output'];
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
};


export type EntityCategoriesArgs = {
  changeThreshold?: InputMaybe<Scalars['Float']['input']>;
  dateRange: DateRange;
};


export type EntityCategoryArgs = {
  categoryId: Scalars['ID']['input'];
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
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  dateRange: DateRange;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export enum GroupBy {
  Month = 'Month',
  Week = 'Week',
  Weekday = 'Weekday',
  Year = 'Year'
}

export type IdOnly = {
  id: Scalars['ID']['input'];
};

export type IdOrAddress = {
  address?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdOrName = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Institution = {
  __typename?: 'Institution';
  accounts: Array<Account>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type MonthlyBalance = {
  __typename?: 'MonthlyBalance';
  balance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  month: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addVendor: Vendor;
  setCategory?: Maybe<Transaction>;
  setVendor?: Maybe<Transaction>;
};


export type MutationAddCategoryArgs = {
  categoryType: CategoryType;
  name: Scalars['String']['input'];
};


export type MutationAddVendorArgs = {
  name: Scalars['String']['input'];
};


export type MutationSetCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  transactionId: Scalars['ID']['input'];
};


export type MutationSetVendorArgs = {
  transactionId: Scalars['ID']['input'];
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export type Pagination = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Performance = {
  __typename?: 'Performance';
  budgeted: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  month: Scalars['String']['output'];
  spent: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  budget?: Maybe<Budget>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  currentBalance: Scalars['Float']['output'];
  dailyBalance: Array<DailyBalance>;
  entities: Array<Entity>;
  entity?: Maybe<Entity>;
  institution?: Maybe<Institution>;
  institutions: Array<Institution>;
  lastRefreshed: Scalars['DateIso']['output'];
  monthlyBalance: Array<MonthlyBalance>;
  transaction?: Maybe<Transaction>;
  transactionGroups: Array<TransactionGroup>;
  transactions: Array<Transaction>;
  vendor?: Maybe<Vendor>;
  vendors: Array<Vendor>;
};


export type QueryAccountArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBudgetArgs = {
  categoryId: Scalars['ID']['input'];
  entityId: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  changeThreshold?: InputMaybe<Scalars['Float']['input']>;
  dateRange: DateRange;
};


export type QueryCategoryArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  dateRange?: InputMaybe<DateRange>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDailyBalanceArgs = {
  dateRange: DateRange;
};


export type QueryEntityArgs = {
  entityId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryInstitutionArgs = {
  institutionId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMonthlyBalanceArgs = {
  dateRange: DateRange;
};


export type QueryTransactionArgs = {
  transactionId: Scalars['ID']['input'];
};


export type QueryTransactionGroupsArgs = {
  dateRange: DateRange;
  groupBy: GroupBy;
};


export type QueryTransactionsArgs = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  dateRange: DateRange;
  entityId?: InputMaybe<Scalars['ID']['input']>;
  pagination?: InputMaybe<Pagination>;
};


export type QueryVendorArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export type Scope = {
  accountId?: InputMaybe<Scalars['ID']['input']>;
  budgetId?: InputMaybe<Scalars['ID']['input']>;
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  entityId?: InputMaybe<Scalars['ID']['input']>;
  institutionId?: InputMaybe<Scalars['ID']['input']>;
  transactionId?: InputMaybe<Scalars['ID']['input']>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  account: Account;
  addedAt: Scalars['DateTimeIso']['output'];
  amount: Scalars['Float']['output'];
  category?: Maybe<Category>;
  date: Scalars['DateIso']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pending: Scalars['Boolean']['output'];
  vendor?: Maybe<Vendor>;
};

export type TransactionGroup = {
  __typename?: 'TransactionGroup';
  count: Scalars['Int']['output'];
  end: Scalars['DateIso']['output'];
  groupIdentifier: Scalars['String']['output'];
  groupIndex: Scalars['Int']['output'];
  groupedBy: GroupBy;
  id: Scalars['ID']['output'];
  start: Scalars['DateIso']['output'];
  total: Scalars['Float']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalIncome: Scalars['Float']['output'];
  transactions: Array<Transaction>;
};


export type TransactionGroupTransactionsArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  pagination?: InputMaybe<Pagination>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

export type Vendor = {
  __typename?: 'Vendor';
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['Base64Url']['output']>;
  name: Scalars['String']['output'];
  total: Scalars['Float']['output'];
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

export type AddCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  categoryType: CategoryType;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', id: string, categoryId: string, name: string, categoryType: CategoryType } };

export type AddVendorMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AddVendorMutation = { __typename?: 'Mutation', addVendor: { __typename?: 'Vendor', id: string, name: string } };

export type SetTransactionCategoryMutationVariables = Exact<{
  transactionId: Scalars['ID']['input'];
  categoryId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SetTransactionCategoryMutation = { __typename?: 'Mutation', setCategory?: { __typename?: 'Transaction', id: string, category?: { __typename?: 'Category', id: string, name: string } | null } | null };

export type SetTransactionVendorMutationVariables = Exact<{
  transactionId: Scalars['ID']['input'];
  vendorId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type SetTransactionVendorMutation = { __typename?: 'Mutation', setVendor?: { __typename?: 'Transaction', id: string, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null } | null };

export type SidebarContentsQueryVariables = Exact<{ [key: string]: never; }>;


export type SidebarContentsQuery = { __typename?: 'Query', entities: Array<{ __typename?: 'Entity', id: string, name: string }> };

export type TransactionGroupQueryVariables = Exact<{
  entityId: Scalars['ID']['input'];
  transactionsDateRange: DateRange;
}>;


export type TransactionGroupQuery = { __typename?: 'Query', entity?: { __typename?: 'Entity', id: string, currentBalance: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }> } | null };

export type TransactionGroupOverviewQueryVariables = Exact<{
  transactionsDateRange: DateRange;
}>;


export type TransactionGroupOverviewQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }> };

export type EntityPageByEntityIdQueryVariables = Exact<{
  entityId?: InputMaybe<Scalars['ID']['input']>;
  insightsDateRange: DateRange;
  transactionsDateRange: DateRange;
  changeThreshold?: InputMaybe<Scalars['Float']['input']>;
  activityDateRange: DateRange;
  activityGroupBy: GroupBy;
  transactionGroupsDateRange: DateRange;
}>;


export type EntityPageByEntityIdQuery = { __typename?: 'Query', lastRefreshed: DateIso, entity?: { __typename?: 'Entity', id: string, currentBalance: number, insights: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string, categoryType: CategoryType, change: { __typename?: 'CategoryChange', id: string, currentTotal: number, previousTotal: number, changePercent?: number | null, proratedPreviousTotal: number, proratedChangePercent?: number | null, proratedPreviousDateRange: { __typename?: 'DateRangeValue', start: DateIso, end: DateIso } }, budget?: { __typename?: 'Budget', currentBudgeted: number, performance: Array<{ __typename?: 'Performance', id: string, month: string, spent: number, budgeted: number }> } | null }>, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, categoryId: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }>, transactionGroups: Array<{ __typename?: 'TransactionGroup', id: string, start: DateIso, end: DateIso, total: number, count: number }>, activity: Array<{ __typename?: 'TransactionGroup', groupIndex: number, start: DateIso, end: DateIso, total: number, totalIncome: number, totalExpenses: number }> } | null };

export type EntityPageOvervallQueryVariables = Exact<{
  insightsDateRange: DateRange;
  transactionsDateRange: DateRange;
  changeThreshold?: InputMaybe<Scalars['Float']['input']>;
  activityDateRange: DateRange;
  activityGroupBy: GroupBy;
  transactionGroupsDateRange: DateRange;
}>;


export type EntityPageOvervallQuery = { __typename?: 'Query', lastRefreshed: DateIso, currentBalance: number, insights: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string, categoryType: CategoryType, change: { __typename?: 'CategoryChange', id: string, currentTotal: number, previousTotal: number, changePercent?: number | null, proratedPreviousTotal: number, proratedChangePercent?: number | null, proratedPreviousDateRange: { __typename?: 'DateRangeValue', start: DateIso, end: DateIso } }, budget?: { __typename?: 'Budget', currentBudgeted: number, performance: Array<{ __typename?: 'Performance', id: string, month: string, spent: number, budgeted: number }> } | null }>, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, categoryId: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }>, transactionGroups: Array<{ __typename?: 'TransactionGroup', id: string, start: DateIso, end: DateIso, total: number, count: number }>, activity: Array<{ __typename?: 'TransactionGroup', groupIndex: number, start: DateIso, end: DateIso, total: number, totalIncome: number, totalExpenses: number }> };

export type EntityActivityQueryVariables = Exact<{
  entityId?: InputMaybe<Scalars['ID']['input']>;
  dateRange: DateRange;
  activityGroupBy: GroupBy;
}>;


export type EntityActivityQuery = { __typename?: 'Query', entity?: { __typename?: 'Entity', id: string, categories: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string, total: number, count: number, categoryType: CategoryType, change: { __typename?: 'CategoryChange', changePercent?: number | null } }>, activity: Array<{ __typename?: 'TransactionGroup', groupIndex: number, start: DateIso, end: DateIso, total: number, totalIncome: number, totalExpenses: number }> } | null };

export type EntityActivityOverviewQueryVariables = Exact<{
  dateRange: DateRange;
  activityGroupBy: GroupBy;
}>;


export type EntityActivityOverviewQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string, total: number, count: number, categoryType: CategoryType, change: { __typename?: 'CategoryChange', changePercent?: number | null } }>, activity: Array<{ __typename?: 'TransactionGroup', groupIndex: number, start: DateIso, end: DateIso, total: number, totalIncome: number, totalExpenses: number }> };

export type TransactionCategoryGroupQueryVariables = Exact<{
  entityId: Scalars['ID']['input'];
  dateRange: DateRange;
  categoryId: Scalars['ID']['input'];
  groupBy: GroupBy;
}>;


export type TransactionCategoryGroupQuery = { __typename?: 'Query', entity?: { __typename?: 'Entity', id: string, currentBalance: number, category: { __typename?: 'Category', id: string, name: string, total: number, count: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }>, transactionGroups: Array<{ __typename?: 'TransactionGroup', id: string, start: DateIso, end: DateIso, total: number, count: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }> }> } } | null };

export type TransactionCategoryGroupOverallQueryVariables = Exact<{
  dateRange: DateRange;
  categoryId: Scalars['ID']['input'];
  groupBy: GroupBy;
}>;


export type TransactionCategoryGroupOverallQuery = { __typename?: 'Query', currentBalance: number, category?: { __typename?: 'Category', id: string, name: string, total: number, count: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }>, transactionGroups: Array<{ __typename?: 'TransactionGroup', id: string, start: DateIso, end: DateIso, total: number, count: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }> }> } | null };

export type TransactionQueryVariables = Exact<{
  transactionId: Scalars['ID']['input'];
}>;


export type TransactionQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, account: { __typename?: 'Account', id: string, name: string, number: string }, category?: { __typename?: 'Category', id: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null } | null };

export type TransactionCategoryQueryVariables = Exact<{
  transactionId: Scalars['ID']['input'];
  dateRange: DateRange;
}>;


export type TransactionCategoryQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', id: string, category?: { __typename?: 'Category', id: string, categoryId: string, name: string } | null } | null, categories: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string, categoryType: CategoryType }> };

export type TransactionVendorQueryVariables = Exact<{
  transactionId: Scalars['ID']['input'];
}>;


export type TransactionVendorQuery = { __typename?: 'Query', transaction?: { __typename?: 'Transaction', id: string, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null } | null, vendors: Array<{ __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null }> };

export type TransactionsReviewQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type TransactionsReviewQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', id: string, date: DateIso, description: string, amount: number, pending: boolean, account: { __typename?: 'Account', id: string, name: string, number: string, entity: { __typename?: 'Entity', id: string, name: string } }, category?: { __typename?: 'Category', id: string, categoryId: string, name: string } | null, vendor?: { __typename?: 'Vendor', id: string, name: string, image?: Base64Url | null } | null }>, categories: Array<{ __typename?: 'Category', id: string, categoryId: string, name: string }>, vendors: Array<{ __typename?: 'Vendor', id: string, name: string }> };


export const AddCategoryDocument = gql`
    mutation AddCategory($name: String!, $categoryType: CategoryType!) {
  addCategory(name: $name, categoryType: $categoryType) {
    id
    categoryId
    name
    categoryType
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      categoryType: // value for 'categoryType'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const AddVendorDocument = gql`
    mutation AddVendor($name: String!) {
  addVendor(name: $name) {
    id
    name
  }
}
    `;
export type AddVendorMutationFn = Apollo.MutationFunction<AddVendorMutation, AddVendorMutationVariables>;

/**
 * __useAddVendorMutation__
 *
 * To run a mutation, you first call `useAddVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addVendorMutation, { data, loading, error }] = useAddVendorMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddVendorMutation(baseOptions?: Apollo.MutationHookOptions<AddVendorMutation, AddVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddVendorMutation, AddVendorMutationVariables>(AddVendorDocument, options);
      }
export type AddVendorMutationHookResult = ReturnType<typeof useAddVendorMutation>;
export type AddVendorMutationResult = Apollo.MutationResult<AddVendorMutation>;
export type AddVendorMutationOptions = Apollo.BaseMutationOptions<AddVendorMutation, AddVendorMutationVariables>;
export const SetTransactionCategoryDocument = gql`
    mutation SetTransactionCategory($transactionId: ID!, $categoryId: ID) {
  setCategory(transactionId: $transactionId, categoryId: $categoryId) {
    id
    category {
      id
      name
    }
  }
}
    `;
export type SetTransactionCategoryMutationFn = Apollo.MutationFunction<SetTransactionCategoryMutation, SetTransactionCategoryMutationVariables>;

/**
 * __useSetTransactionCategoryMutation__
 *
 * To run a mutation, you first call `useSetTransactionCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTransactionCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTransactionCategoryMutation, { data, loading, error }] = useSetTransactionCategoryMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useSetTransactionCategoryMutation(baseOptions?: Apollo.MutationHookOptions<SetTransactionCategoryMutation, SetTransactionCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTransactionCategoryMutation, SetTransactionCategoryMutationVariables>(SetTransactionCategoryDocument, options);
      }
export type SetTransactionCategoryMutationHookResult = ReturnType<typeof useSetTransactionCategoryMutation>;
export type SetTransactionCategoryMutationResult = Apollo.MutationResult<SetTransactionCategoryMutation>;
export type SetTransactionCategoryMutationOptions = Apollo.BaseMutationOptions<SetTransactionCategoryMutation, SetTransactionCategoryMutationVariables>;
export const SetTransactionVendorDocument = gql`
    mutation SetTransactionVendor($transactionId: ID!, $vendorId: ID) {
  setVendor(transactionId: $transactionId, vendorId: $vendorId) {
    id
    vendor {
      id
      name
      image
    }
  }
}
    `;
export type SetTransactionVendorMutationFn = Apollo.MutationFunction<SetTransactionVendorMutation, SetTransactionVendorMutationVariables>;

/**
 * __useSetTransactionVendorMutation__
 *
 * To run a mutation, you first call `useSetTransactionVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTransactionVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTransactionVendorMutation, { data, loading, error }] = useSetTransactionVendorMutation({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *      vendorId: // value for 'vendorId'
 *   },
 * });
 */
export function useSetTransactionVendorMutation(baseOptions?: Apollo.MutationHookOptions<SetTransactionVendorMutation, SetTransactionVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTransactionVendorMutation, SetTransactionVendorMutationVariables>(SetTransactionVendorDocument, options);
      }
export type SetTransactionVendorMutationHookResult = ReturnType<typeof useSetTransactionVendorMutation>;
export type SetTransactionVendorMutationResult = Apollo.MutationResult<SetTransactionVendorMutation>;
export type SetTransactionVendorMutationOptions = Apollo.BaseMutationOptions<SetTransactionVendorMutation, SetTransactionVendorMutationVariables>;
export const SidebarContentsDocument = gql`
    query SidebarContents {
  entities {
    id
    name
  }
}
    `;

/**
 * __useSidebarContentsQuery__
 *
 * To run a query within a React component, call `useSidebarContentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSidebarContentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSidebarContentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSidebarContentsQuery(baseOptions?: Apollo.QueryHookOptions<SidebarContentsQuery, SidebarContentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SidebarContentsQuery, SidebarContentsQueryVariables>(SidebarContentsDocument, options);
      }
export function useSidebarContentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SidebarContentsQuery, SidebarContentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SidebarContentsQuery, SidebarContentsQueryVariables>(SidebarContentsDocument, options);
        }
export function useSidebarContentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SidebarContentsQuery, SidebarContentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SidebarContentsQuery, SidebarContentsQueryVariables>(SidebarContentsDocument, options);
        }
export type SidebarContentsQueryHookResult = ReturnType<typeof useSidebarContentsQuery>;
export type SidebarContentsLazyQueryHookResult = ReturnType<typeof useSidebarContentsLazyQuery>;
export type SidebarContentsSuspenseQueryHookResult = ReturnType<typeof useSidebarContentsSuspenseQuery>;
export type SidebarContentsQueryResult = Apollo.QueryResult<SidebarContentsQuery, SidebarContentsQueryVariables>;
export const TransactionGroupDocument = gql`
    query TransactionGroup($entityId: ID!, $transactionsDateRange: DateRange!) {
  entity(entityId: $entityId) {
    id
    currentBalance
    transactions(dateRange: $transactionsDateRange) {
      id
      date
      description
      amount
      pending
      category {
        id
        name
      }
      vendor {
        id
        name
        image
      }
    }
  }
}
    `;

/**
 * __useTransactionGroupQuery__
 *
 * To run a query within a React component, call `useTransactionGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionGroupQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      transactionsDateRange: // value for 'transactionsDateRange'
 *   },
 * });
 */
export function useTransactionGroupQuery(baseOptions: Apollo.QueryHookOptions<TransactionGroupQuery, TransactionGroupQueryVariables> & ({ variables: TransactionGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionGroupQuery, TransactionGroupQueryVariables>(TransactionGroupDocument, options);
      }
export function useTransactionGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionGroupQuery, TransactionGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionGroupQuery, TransactionGroupQueryVariables>(TransactionGroupDocument, options);
        }
export function useTransactionGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionGroupQuery, TransactionGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionGroupQuery, TransactionGroupQueryVariables>(TransactionGroupDocument, options);
        }
export type TransactionGroupQueryHookResult = ReturnType<typeof useTransactionGroupQuery>;
export type TransactionGroupLazyQueryHookResult = ReturnType<typeof useTransactionGroupLazyQuery>;
export type TransactionGroupSuspenseQueryHookResult = ReturnType<typeof useTransactionGroupSuspenseQuery>;
export type TransactionGroupQueryResult = Apollo.QueryResult<TransactionGroupQuery, TransactionGroupQueryVariables>;
export const TransactionGroupOverviewDocument = gql`
    query TransactionGroupOverview($transactionsDateRange: DateRange!) {
  transactions(dateRange: $transactionsDateRange) {
    id
    date
    description
    amount
    pending
    category {
      id
      name
    }
    vendor {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useTransactionGroupOverviewQuery__
 *
 * To run a query within a React component, call `useTransactionGroupOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionGroupOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionGroupOverviewQuery({
 *   variables: {
 *      transactionsDateRange: // value for 'transactionsDateRange'
 *   },
 * });
 */
export function useTransactionGroupOverviewQuery(baseOptions: Apollo.QueryHookOptions<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables> & ({ variables: TransactionGroupOverviewQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>(TransactionGroupOverviewDocument, options);
      }
export function useTransactionGroupOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>(TransactionGroupOverviewDocument, options);
        }
export function useTransactionGroupOverviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>(TransactionGroupOverviewDocument, options);
        }
export type TransactionGroupOverviewQueryHookResult = ReturnType<typeof useTransactionGroupOverviewQuery>;
export type TransactionGroupOverviewLazyQueryHookResult = ReturnType<typeof useTransactionGroupOverviewLazyQuery>;
export type TransactionGroupOverviewSuspenseQueryHookResult = ReturnType<typeof useTransactionGroupOverviewSuspenseQuery>;
export type TransactionGroupOverviewQueryResult = Apollo.QueryResult<TransactionGroupOverviewQuery, TransactionGroupOverviewQueryVariables>;
export const EntityPageByEntityIdDocument = gql`
    query EntityPageByEntityId($entityId: ID, $insightsDateRange: DateRange!, $transactionsDateRange: DateRange!, $changeThreshold: Float, $activityDateRange: DateRange!, $activityGroupBy: GroupBy!, $transactionGroupsDateRange: DateRange!) {
  lastRefreshed
  entity(entityId: $entityId) {
    id
    currentBalance
    insights: categories(
      dateRange: $insightsDateRange
      changeThreshold: $changeThreshold
    ) {
      id
      categoryId
      name
      categoryType
      change {
        id
        currentTotal
        previousTotal
        changePercent
        proratedPreviousTotal
        proratedPreviousDateRange {
          start
          end
        }
        proratedChangePercent
      }
      budget {
        currentBudgeted
        performance(groupBy: Month) {
          id
          month
          spent
          budgeted
        }
      }
    }
    transactions(dateRange: $transactionsDateRange) {
      id
      date
      description
      amount
      pending
      category {
        id
        categoryId
        name
      }
      vendor {
        id
        name
        image
      }
    }
    transactionGroups(dateRange: $transactionGroupsDateRange, groupBy: Month) {
      id
      start
      end
      total
      count
    }
    activity: transactionGroups(
      groupBy: $activityGroupBy
      dateRange: $activityDateRange
    ) {
      groupIndex
      start
      end
      total
      totalIncome
      totalExpenses
    }
  }
}
    `;

/**
 * __useEntityPageByEntityIdQuery__
 *
 * To run a query within a React component, call `useEntityPageByEntityIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityPageByEntityIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityPageByEntityIdQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      insightsDateRange: // value for 'insightsDateRange'
 *      transactionsDateRange: // value for 'transactionsDateRange'
 *      changeThreshold: // value for 'changeThreshold'
 *      activityDateRange: // value for 'activityDateRange'
 *      activityGroupBy: // value for 'activityGroupBy'
 *      transactionGroupsDateRange: // value for 'transactionGroupsDateRange'
 *   },
 * });
 */
export function useEntityPageByEntityIdQuery(baseOptions: Apollo.QueryHookOptions<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables> & ({ variables: EntityPageByEntityIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>(EntityPageByEntityIdDocument, options);
      }
export function useEntityPageByEntityIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>(EntityPageByEntityIdDocument, options);
        }
export function useEntityPageByEntityIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>(EntityPageByEntityIdDocument, options);
        }
export type EntityPageByEntityIdQueryHookResult = ReturnType<typeof useEntityPageByEntityIdQuery>;
export type EntityPageByEntityIdLazyQueryHookResult = ReturnType<typeof useEntityPageByEntityIdLazyQuery>;
export type EntityPageByEntityIdSuspenseQueryHookResult = ReturnType<typeof useEntityPageByEntityIdSuspenseQuery>;
export type EntityPageByEntityIdQueryResult = Apollo.QueryResult<EntityPageByEntityIdQuery, EntityPageByEntityIdQueryVariables>;
export const EntityPageOvervallDocument = gql`
    query EntityPageOvervall($insightsDateRange: DateRange!, $transactionsDateRange: DateRange!, $changeThreshold: Float, $activityDateRange: DateRange!, $activityGroupBy: GroupBy!, $transactionGroupsDateRange: DateRange!) {
  lastRefreshed
  currentBalance
  insights: categories(
    dateRange: $insightsDateRange
    changeThreshold: $changeThreshold
  ) {
    id
    categoryId
    name
    categoryType
    change {
      id
      currentTotal
      previousTotal
      changePercent
      proratedPreviousTotal
      proratedPreviousDateRange {
        start
        end
      }
      proratedChangePercent
    }
    budget {
      currentBudgeted
      performance(groupBy: Month) {
        id
        month
        spent
        budgeted
      }
    }
  }
  transactions(dateRange: $transactionsDateRange) {
    id
    date
    description
    amount
    pending
    category {
      id
      categoryId
      name
    }
    vendor {
      id
      name
      image
    }
  }
  transactionGroups(dateRange: $transactionGroupsDateRange, groupBy: Month) {
    id
    start
    end
    total
    count
  }
  activity: transactionGroups(
    groupBy: $activityGroupBy
    dateRange: $activityDateRange
  ) {
    groupIndex
    start
    end
    total
    totalIncome
    totalExpenses
  }
}
    `;

/**
 * __useEntityPageOvervallQuery__
 *
 * To run a query within a React component, call `useEntityPageOvervallQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityPageOvervallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityPageOvervallQuery({
 *   variables: {
 *      insightsDateRange: // value for 'insightsDateRange'
 *      transactionsDateRange: // value for 'transactionsDateRange'
 *      changeThreshold: // value for 'changeThreshold'
 *      activityDateRange: // value for 'activityDateRange'
 *      activityGroupBy: // value for 'activityGroupBy'
 *      transactionGroupsDateRange: // value for 'transactionGroupsDateRange'
 *   },
 * });
 */
export function useEntityPageOvervallQuery(baseOptions: Apollo.QueryHookOptions<EntityPageOvervallQuery, EntityPageOvervallQueryVariables> & ({ variables: EntityPageOvervallQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>(EntityPageOvervallDocument, options);
      }
export function useEntityPageOvervallLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>(EntityPageOvervallDocument, options);
        }
export function useEntityPageOvervallSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>(EntityPageOvervallDocument, options);
        }
export type EntityPageOvervallQueryHookResult = ReturnType<typeof useEntityPageOvervallQuery>;
export type EntityPageOvervallLazyQueryHookResult = ReturnType<typeof useEntityPageOvervallLazyQuery>;
export type EntityPageOvervallSuspenseQueryHookResult = ReturnType<typeof useEntityPageOvervallSuspenseQuery>;
export type EntityPageOvervallQueryResult = Apollo.QueryResult<EntityPageOvervallQuery, EntityPageOvervallQueryVariables>;
export const EntityActivityDocument = gql`
    query EntityActivity($entityId: ID, $dateRange: DateRange!, $activityGroupBy: GroupBy!) {
  entity(entityId: $entityId) {
    id
    categories(dateRange: $dateRange) {
      id
      categoryId
      name
      total
      count
      categoryType
      change {
        changePercent
      }
    }
    activity: transactionGroups(groupBy: $activityGroupBy, dateRange: $dateRange) {
      groupIndex
      start
      end
      total
      totalIncome
      totalExpenses
    }
  }
}
    `;

/**
 * __useEntityActivityQuery__
 *
 * To run a query within a React component, call `useEntityActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityActivityQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      dateRange: // value for 'dateRange'
 *      activityGroupBy: // value for 'activityGroupBy'
 *   },
 * });
 */
export function useEntityActivityQuery(baseOptions: Apollo.QueryHookOptions<EntityActivityQuery, EntityActivityQueryVariables> & ({ variables: EntityActivityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityActivityQuery, EntityActivityQueryVariables>(EntityActivityDocument, options);
      }
export function useEntityActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityActivityQuery, EntityActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityActivityQuery, EntityActivityQueryVariables>(EntityActivityDocument, options);
        }
export function useEntityActivitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntityActivityQuery, EntityActivityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntityActivityQuery, EntityActivityQueryVariables>(EntityActivityDocument, options);
        }
export type EntityActivityQueryHookResult = ReturnType<typeof useEntityActivityQuery>;
export type EntityActivityLazyQueryHookResult = ReturnType<typeof useEntityActivityLazyQuery>;
export type EntityActivitySuspenseQueryHookResult = ReturnType<typeof useEntityActivitySuspenseQuery>;
export type EntityActivityQueryResult = Apollo.QueryResult<EntityActivityQuery, EntityActivityQueryVariables>;
export const EntityActivityOverviewDocument = gql`
    query EntityActivityOverview($dateRange: DateRange!, $activityGroupBy: GroupBy!) {
  categories(dateRange: $dateRange) {
    id
    categoryId
    name
    total
    count
    categoryType
    change {
      changePercent
    }
  }
  activity: transactionGroups(groupBy: $activityGroupBy, dateRange: $dateRange) {
    groupIndex
    start
    end
    total
    totalIncome
    totalExpenses
  }
}
    `;

/**
 * __useEntityActivityOverviewQuery__
 *
 * To run a query within a React component, call `useEntityActivityOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityActivityOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityActivityOverviewQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *      activityGroupBy: // value for 'activityGroupBy'
 *   },
 * });
 */
export function useEntityActivityOverviewQuery(baseOptions: Apollo.QueryHookOptions<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables> & ({ variables: EntityActivityOverviewQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>(EntityActivityOverviewDocument, options);
      }
export function useEntityActivityOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>(EntityActivityOverviewDocument, options);
        }
export function useEntityActivityOverviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>(EntityActivityOverviewDocument, options);
        }
export type EntityActivityOverviewQueryHookResult = ReturnType<typeof useEntityActivityOverviewQuery>;
export type EntityActivityOverviewLazyQueryHookResult = ReturnType<typeof useEntityActivityOverviewLazyQuery>;
export type EntityActivityOverviewSuspenseQueryHookResult = ReturnType<typeof useEntityActivityOverviewSuspenseQuery>;
export type EntityActivityOverviewQueryResult = Apollo.QueryResult<EntityActivityOverviewQuery, EntityActivityOverviewQueryVariables>;
export const TransactionCategoryGroupDocument = gql`
    query TransactionCategoryGroup($entityId: ID!, $dateRange: DateRange!, $categoryId: ID!, $groupBy: GroupBy!) {
  entity(entityId: $entityId) {
    id
    currentBalance
    category(dateRange: $dateRange, categoryId: $categoryId) {
      id
      name
      total
      count
      transactions {
        id
        date
        description
        amount
        pending
        category {
          id
          name
        }
        vendor {
          id
          name
          image
        }
      }
      transactionGroups(groupBy: $groupBy) {
        id
        start
        end
        total
        count
        transactions {
          id
          date
          description
          amount
          pending
          category {
            id
            name
          }
          vendor {
            id
            name
            image
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTransactionCategoryGroupQuery__
 *
 * To run a query within a React component, call `useTransactionCategoryGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionCategoryGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionCategoryGroupQuery({
 *   variables: {
 *      entityId: // value for 'entityId'
 *      dateRange: // value for 'dateRange'
 *      categoryId: // value for 'categoryId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useTransactionCategoryGroupQuery(baseOptions: Apollo.QueryHookOptions<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables> & ({ variables: TransactionCategoryGroupQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>(TransactionCategoryGroupDocument, options);
      }
export function useTransactionCategoryGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>(TransactionCategoryGroupDocument, options);
        }
export function useTransactionCategoryGroupSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>(TransactionCategoryGroupDocument, options);
        }
export type TransactionCategoryGroupQueryHookResult = ReturnType<typeof useTransactionCategoryGroupQuery>;
export type TransactionCategoryGroupLazyQueryHookResult = ReturnType<typeof useTransactionCategoryGroupLazyQuery>;
export type TransactionCategoryGroupSuspenseQueryHookResult = ReturnType<typeof useTransactionCategoryGroupSuspenseQuery>;
export type TransactionCategoryGroupQueryResult = Apollo.QueryResult<TransactionCategoryGroupQuery, TransactionCategoryGroupQueryVariables>;
export const TransactionCategoryGroupOverallDocument = gql`
    query TransactionCategoryGroupOverall($dateRange: DateRange!, $categoryId: ID!, $groupBy: GroupBy!) {
  currentBalance
  category(dateRange: $dateRange, categoryId: $categoryId) {
    id
    name
    total
    count
    transactions {
      id
      date
      description
      amount
      pending
      category {
        id
        name
      }
      vendor {
        id
        name
        image
      }
    }
    transactionGroups(groupBy: $groupBy) {
      id
      start
      end
      total
      count
      transactions {
        id
        date
        description
        amount
        pending
        category {
          id
          name
        }
        vendor {
          id
          name
          image
        }
      }
    }
  }
}
    `;

/**
 * __useTransactionCategoryGroupOverallQuery__
 *
 * To run a query within a React component, call `useTransactionCategoryGroupOverallQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionCategoryGroupOverallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionCategoryGroupOverallQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *      categoryId: // value for 'categoryId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useTransactionCategoryGroupOverallQuery(baseOptions: Apollo.QueryHookOptions<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables> & ({ variables: TransactionCategoryGroupOverallQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>(TransactionCategoryGroupOverallDocument, options);
      }
export function useTransactionCategoryGroupOverallLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>(TransactionCategoryGroupOverallDocument, options);
        }
export function useTransactionCategoryGroupOverallSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>(TransactionCategoryGroupOverallDocument, options);
        }
export type TransactionCategoryGroupOverallQueryHookResult = ReturnType<typeof useTransactionCategoryGroupOverallQuery>;
export type TransactionCategoryGroupOverallLazyQueryHookResult = ReturnType<typeof useTransactionCategoryGroupOverallLazyQuery>;
export type TransactionCategoryGroupOverallSuspenseQueryHookResult = ReturnType<typeof useTransactionCategoryGroupOverallSuspenseQuery>;
export type TransactionCategoryGroupOverallQueryResult = Apollo.QueryResult<TransactionCategoryGroupOverallQuery, TransactionCategoryGroupOverallQueryVariables>;
export const TransactionDocument = gql`
    query Transaction($transactionId: ID!) {
  transaction(transactionId: $transactionId) {
    id
    account {
      id
      name
      number
    }
    date
    category {
      id
      name
    }
    description
    amount
    pending
    vendor {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useTransactionQuery__
 *
 * To run a query within a React component, call `useTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionQuery(baseOptions: Apollo.QueryHookOptions<TransactionQuery, TransactionQueryVariables> & ({ variables: TransactionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
      }
export function useTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
        }
export function useTransactionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionQuery, TransactionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionQuery, TransactionQueryVariables>(TransactionDocument, options);
        }
export type TransactionQueryHookResult = ReturnType<typeof useTransactionQuery>;
export type TransactionLazyQueryHookResult = ReturnType<typeof useTransactionLazyQuery>;
export type TransactionSuspenseQueryHookResult = ReturnType<typeof useTransactionSuspenseQuery>;
export type TransactionQueryResult = Apollo.QueryResult<TransactionQuery, TransactionQueryVariables>;
export const TransactionCategoryDocument = gql`
    query TransactionCategory($transactionId: ID!, $dateRange: DateRange!) {
  transaction(transactionId: $transactionId) {
    id
    category {
      id
      categoryId
      name
    }
  }
  categories(dateRange: $dateRange) {
    id
    categoryId
    name
    categoryType
  }
}
    `;

/**
 * __useTransactionCategoryQuery__
 *
 * To run a query within a React component, call `useTransactionCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionCategoryQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useTransactionCategoryQuery(baseOptions: Apollo.QueryHookOptions<TransactionCategoryQuery, TransactionCategoryQueryVariables> & ({ variables: TransactionCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionCategoryQuery, TransactionCategoryQueryVariables>(TransactionCategoryDocument, options);
      }
export function useTransactionCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionCategoryQuery, TransactionCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionCategoryQuery, TransactionCategoryQueryVariables>(TransactionCategoryDocument, options);
        }
export function useTransactionCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionCategoryQuery, TransactionCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionCategoryQuery, TransactionCategoryQueryVariables>(TransactionCategoryDocument, options);
        }
export type TransactionCategoryQueryHookResult = ReturnType<typeof useTransactionCategoryQuery>;
export type TransactionCategoryLazyQueryHookResult = ReturnType<typeof useTransactionCategoryLazyQuery>;
export type TransactionCategorySuspenseQueryHookResult = ReturnType<typeof useTransactionCategorySuspenseQuery>;
export type TransactionCategoryQueryResult = Apollo.QueryResult<TransactionCategoryQuery, TransactionCategoryQueryVariables>;
export const TransactionVendorDocument = gql`
    query TransactionVendor($transactionId: ID!) {
  transaction(transactionId: $transactionId) {
    id
    vendor {
      id
      name
      image
    }
  }
  vendors {
    id
    name
    image
  }
}
    `;

/**
 * __useTransactionVendorQuery__
 *
 * To run a query within a React component, call `useTransactionVendorQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionVendorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionVendorQuery({
 *   variables: {
 *      transactionId: // value for 'transactionId'
 *   },
 * });
 */
export function useTransactionVendorQuery(baseOptions: Apollo.QueryHookOptions<TransactionVendorQuery, TransactionVendorQueryVariables> & ({ variables: TransactionVendorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionVendorQuery, TransactionVendorQueryVariables>(TransactionVendorDocument, options);
      }
export function useTransactionVendorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionVendorQuery, TransactionVendorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionVendorQuery, TransactionVendorQueryVariables>(TransactionVendorDocument, options);
        }
export function useTransactionVendorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionVendorQuery, TransactionVendorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionVendorQuery, TransactionVendorQueryVariables>(TransactionVendorDocument, options);
        }
export type TransactionVendorQueryHookResult = ReturnType<typeof useTransactionVendorQuery>;
export type TransactionVendorLazyQueryHookResult = ReturnType<typeof useTransactionVendorLazyQuery>;
export type TransactionVendorSuspenseQueryHookResult = ReturnType<typeof useTransactionVendorSuspenseQuery>;
export type TransactionVendorQueryResult = Apollo.QueryResult<TransactionVendorQuery, TransactionVendorQueryVariables>;
export const TransactionsReviewDocument = gql`
    query TransactionsReview($dateRange: DateRange!) {
  transactions(dateRange: $dateRange) {
    id
    date
    description
    amount
    pending
    account {
      id
      name
      number
      entity {
        id
        name
      }
    }
    category {
      id
      categoryId
      name
    }
    vendor {
      id
      name
      image
    }
  }
  categories(dateRange: $dateRange) {
    id
    categoryId
    name
  }
  vendors {
    id
    name
  }
}
    `;

/**
 * __useTransactionsReviewQuery__
 *
 * To run a query within a React component, call `useTransactionsReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsReviewQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useTransactionsReviewQuery(baseOptions: Apollo.QueryHookOptions<TransactionsReviewQuery, TransactionsReviewQueryVariables> & ({ variables: TransactionsReviewQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionsReviewQuery, TransactionsReviewQueryVariables>(TransactionsReviewDocument, options);
      }
export function useTransactionsReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsReviewQuery, TransactionsReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionsReviewQuery, TransactionsReviewQueryVariables>(TransactionsReviewDocument, options);
        }
export function useTransactionsReviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TransactionsReviewQuery, TransactionsReviewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TransactionsReviewQuery, TransactionsReviewQueryVariables>(TransactionsReviewDocument, options);
        }
export type TransactionsReviewQueryHookResult = ReturnType<typeof useTransactionsReviewQuery>;
export type TransactionsReviewLazyQueryHookResult = ReturnType<typeof useTransactionsReviewLazyQuery>;
export type TransactionsReviewSuspenseQueryHookResult = ReturnType<typeof useTransactionsReviewSuspenseQuery>;
export type TransactionsReviewQueryResult = Apollo.QueryResult<TransactionsReviewQuery, TransactionsReviewQueryVariables>;