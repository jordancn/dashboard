import { accountResolvers } from "@/resolvers/AccountResolvers";
import { budgetResolvers } from "@/resolvers/BudgetResolvers";
import { categoryChangeResolvers } from "@/resolvers/CategoryChangeResolvers";
import { categoryResolvers } from "@/resolvers/CategoryResolvers";
import { entityResolvers } from "@/resolvers/EntityResolvers";
import { institutionResolvers } from "@/resolvers/InstitutionResolvers";
import { mutationResolvers } from "@/resolvers/MutationResolvers";
import { performanceResolvers } from "@/resolvers/PerformanceResolvers";
import { queryResolvers } from "@/resolvers/QueryResolvers";
import { transactionGroupResolvers } from "@/resolvers/TransactionGroupResolvers";
import { transactionResolvers } from "@/resolvers/TransactionResolvers";
import { vendorResolvers } from "@/resolvers/VendorResolvers";

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
  Performance: performanceResolvers,
  Mutation: mutationResolvers,
};
