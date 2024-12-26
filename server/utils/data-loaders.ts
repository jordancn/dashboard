import { Context, prisma } from "@/context";
import {
  AccountId,
  BudgetAmountId,
  BudgetId,
  CategoryId,
  EntityId,
  InstitutionId,
  TransactionId,
  VendorId,
} from "@/types/model";
import { DateTimeIso, toIsoDateTime } from "@/utils/date-time-iso";
import {
  Account,
  Budget,
  BudgetAmount,
  Category,
  Entity,
  Institution,
  Transaction,
  Vendor,
} from "@prisma/client";
import DataLoader from "dataloader";
import stringify from "json-stable-stringify";
import * as _ from "lodash";

export type Data = {
  Entity: {
    findById: DataLoader<EntityId, Entity | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.entity.findFirst>[0],
      Entity | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.entity.findMany>[0],
      Entity[]
    >;
  };
  Institution: {
    findById: DataLoader<InstitutionId, Institution | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.institution.findFirst>[0],
      Institution | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.institution.findMany>[0],
      Institution[]
    >;
  };
  Vendor: {
    findById: DataLoader<VendorId, Vendor | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.vendor.findFirst>[0],
      Vendor | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.vendor.findMany>[0],
      Vendor[]
    >;
  };
  Category: {
    findById: DataLoader<CategoryId, Category | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.category.findFirst>[0],
      Category | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.category.findMany>[0],
      Category[]
    >;
  };
  Account: {
    findById: DataLoader<AccountId, Account | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.account.findFirst>[0],
      Account | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.account.findMany>[0],
      Account[]
    >;
  };
  Transaction: {
    findById: DataLoader<TransactionId, Transaction | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.transaction.findFirst>[0],
      Transaction | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.transaction.findMany>[0],
      Transaction[]
    >;
  };
  Budget: {
    findById: DataLoader<BudgetId, Budget | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.budget.findFirst>[0],
      Budget | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.budget.findMany>[0],
      Budget[]
    >;
  };
  BudgetAmount: {
    findById: DataLoader<BudgetAmountId, BudgetAmount | null>;
    findFirst: DataLoader<
      Parameters<typeof prisma.budgetAmount.findFirst>[0],
      BudgetAmount | null
    >;
    findMany: DataLoader<
      Parameters<typeof prisma.budgetAmount.findMany>[0],
      BudgetAmount[]
    >;
  };
  RefreshLog: {
    accountLastRefreshed: DataLoader<AccountId, DateTimeIso | null>;
    lastRefreshed: DataLoader<"overall", DateTimeIso | null>;
  };
};

const cacheKeyFn = stringify;
// const cacheKeyFn = v4;

export const buildModel = () => {
  const model: Context["model"] = {
    Entity: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.entity.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.entity.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.entity.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Institution: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.institution.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.institution.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.institution.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Vendor: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.vendor.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.vendor.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.vendor.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Category: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.category.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.category.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.category.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Account: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.account.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.account.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.account.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Transaction: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.transaction.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.transaction.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.transaction.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    Budget: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.budget.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.budget.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.budget.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    BudgetAmount: {
      findById: new DataLoader(
        async (options) => {
          const results = await prisma.budgetAmount.findMany({
            where: { id: { in: [...options] } },
          });

          const keyed = _.keyBy(results, (r) => r.id);

          return options.map((option) => keyed[option]);
        },
        { cacheKeyFn }
      ),
      findFirst: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.budgetAmount.findFirst(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
      findMany: new DataLoader(
        async (options) => {
          const results = await Promise.all(
            options.map((option) => {
              return prisma.budgetAmount.findMany(option);
            })
          );

          return results;
        },
        { cacheKeyFn }
      ),
    },
    RefreshLog: {
      lastRefreshed: new DataLoader(async (requests) => {
        const results = await prisma.refreshLog.aggregate({
          _max: {
            refreshedAt: true,
          },
        });

        return requests.map((option) => {
          const lastRefreshed = results._max.refreshedAt;

          return lastRefreshed ? toIsoDateTime(lastRefreshed) : null;
        });
      }),

      accountLastRefreshed: new DataLoader(async (options) => {
        const results = await prisma.refreshLog.groupBy({
          by: ["accountId"],
          _max: {
            refreshedAt: true,
          },
          where: { accountId: { in: [...options] } },
        });

        const keyed = _.keyBy(results, (r) => r.accountId);

        return options.map((option) => {
          const lastRefreshed = keyed[option]?._max.refreshedAt;

          return lastRefreshed ? toIsoDateTime(lastRefreshed) : null;
        });
      }),
    },
  };
  return model;
};
