import { Flavor, Id } from "@/types/core";

export type EntityId = Flavor<Id, "Entity">;
export type InstitutionId = Flavor<Id, "Institution">;
export type VendorId = Flavor<Id, "Vendor">;
export type CategoryId = Flavor<Id, "Category">;
export type AccountId = Flavor<Id, "Account">;
export type TransactionId = Flavor<Id, "Transaction">;
export type BudgetId = Flavor<Id, "Budget">;
export type BudgetAmountId = Flavor<Id, "BudgetAmount">;
export type PropertyId = Flavor<Id, "Property">;
export type PerformanceId = Flavor<Id, "Performance">;
export type MonthlyBalanceId = Flavor<Id, "MonthlyBalance">;
export type DailyBalanceId = Flavor<Id, "DailyBalance">;
