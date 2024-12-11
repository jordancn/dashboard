import { accountResolvers } from "./AccountResolvers";
import { budgetResolvers } from "./BudgetResolvers";
import { categoryChangeResolvers } from "./CategoryChangeResolvers";
import { categoryResolvers } from "./CategoryResolvers";
import { entityResolvers } from "./EntityResolvers";
import { institutionResolvers } from "./InstitutionResolvers";
import { mutationResolvers } from "./MutationResolvers";
import { performanceResolvers } from "./PerformanceResolvers";
import { propertyResolvers } from "./PropertyResolvers";
import { queryResolvers } from "./QueryResolvers";
import { transactionGroupResolvers } from "./TransactionGroupResolvers";
import { transactionResolvers } from "./TransactionResolvers";
import { vendorResolvers } from "./VendorResolvers";

export const resolvers = {
  Query: queryResolvers,
  Entity: entityResolvers,
  Institution: institutionResolvers,
  Vendor: vendorResolvers,
  Category: categoryResolvers,
  CategoryChange: categoryChangeResolvers,
  Account: accountResolvers,
  Transaction: transactionResolvers,
  TransactionGroup: transactionGroupResolvers,
  Budget: budgetResolvers,
  Property: propertyResolvers,
  Performance: performanceResolvers,
  Mutation: mutationResolvers,
};
