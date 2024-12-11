import { GroupBy } from "./types/graphql/server.gen";
import { DateRange } from "./types/interface";
import {
  AccountId,
  BudgetId,
  CategoryId,
  DailyBalanceId,
  EntityId,
  InstitutionId,
  MonthlyBalanceId,
  PerformanceId,
  PropertyId,
  TransactionId,
  VendorId,
} from "./types/model";

export type Scope = {
  entityId?: EntityId;
  institutionId?: InstitutionId;
  vendorId?: VendorId;
  categoryId?: CategoryId;
  accountId?: AccountId;
  transactionId?: TransactionId;
  budgetId?: BudgetId;
  propertyId?: PropertyId;
  performanceId?: PerformanceId;
  monthlyBalanceId?: MonthlyBalanceId;
  dailyBalanceId?: DailyBalanceId;
  groupBy?: GroupBy;
  groupIndex?: number;
  dateRange?: DateRange;
  thresholdPercent?: number;
};
