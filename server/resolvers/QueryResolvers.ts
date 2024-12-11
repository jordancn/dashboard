import { Context } from "../context";
import { QueryResolvers } from "../types/graphql/server.gen";
import { optional, required } from "../utils/core";
import { today } from "../utils/date-iso";
import { asId, narrowScope, Parent, withScope } from "./helpers";

export const queryResolvers: QueryResolvers<Context, Parent> = {
  lastRefreshed: async (parent, args, context, info) => {
    const lastRefreshed = await context.model.RefreshLog.lastRefreshed.load(
      "overall"
    );

    return lastRefreshed;
  },
  entity: async (parent, args, context, info) => {
    if (args.entityId) {
      const scope = narrowScope(context.scope, {
        entityId: args.entityId,
      });

      return { id: args.entityId, scope };
    }

    if (args.name) {
      const entity = await context.model.Entity.findFirst.load({
        where: { name: args.name },
        rejectOnNotFound: false,
      });

      if (!entity) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        entityId: entity.id,
      });

      return { id: entity.id, scope };
    }

    return null;
  },
  institution: async (parent, args, context, info) => {
    if (args.institutionId) {
      const scope = narrowScope(context.scope, {
        institutionId: args.institutionId,
      });

      return { id: args.institutionId, scope };
    }

    if (args.name) {
      const institution = await context.model.Institution.findFirst.load({
        where: { name: args.name },
        rejectOnNotFound: false,
      });

      if (!institution) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        institutionId: institution.id,
      });

      return { id: institution.id, scope };
    }

    return null;
  },
  category: async (parent, args, context, info) => {
    if (args.categoryId) {
      const scope = narrowScope(context.scope, {
        categoryId: args.categoryId,
        dateRange: args.dateRange || undefined,
      });

      return { id: args.categoryId, scope };
    }

    if (args.name) {
      const category = await context.model.Category.findFirst.load({
        where: { name: args.name },
        rejectOnNotFound: false,
      });

      if (!category) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        categoryId: category.id,
      });

      return { id: category.id, scope };
    }

    return null;
  },
  vendor: async (parent, args, context, info) => {
    if (args.vendorId) {
      const scope = narrowScope(context.scope, {
        vendorId: args.vendorId,
      });

      return { id: args.vendorId, scope };
    }

    if (args.name) {
      const vendor = await context.model.Vendor.findFirst.load({
        where: { name: args.name },
        rejectOnNotFound: false,
      });

      if (!vendor) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        vendorId: vendor.id,
      });

      return { id: vendor.id, scope };
    }

    return null;
  },
  account: async (parent, args, context, info) => {
    if (args.accountId) {
      const scope = narrowScope(context.scope, {
        accountId: args.accountId,
      });

      return { id: args.accountId, scope };
    }

    if (args.name) {
      const account = await context.model.Account.findFirst.load({
        where: { name: args.name },
        rejectOnNotFound: false,
      });

      if (!account) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        accountId: account.id,
      });

      return { id: account.id, scope };
    }

    return null;
  },
  transaction: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {
      transactionId: args.transactionId,
    });

    return { id: args.transactionId, scope };
  },
  property: async (parent, args, context, info) => {
    if (args.propertyId) {
      const scope = narrowScope(context.scope, {
        propertyId: args.propertyId,
      });

      return { id: args.propertyId, scope };
    }

    if (args.address) {
      const property = await context.model.Property.findFirst.load({
        where: { address: args.address },
        rejectOnNotFound: false,
      });

      if (!property) {
        return null;
      }

      const scope = narrowScope(context.scope, {
        propertyId: property.id,
      });

      return { id: property.id, scope };
    }

    return null;
  },
  entities: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    return withScope(
      await context.model.Entity.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (entity) => ({ entityId: entity.id })
    );
  },
  institutions: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    return withScope(
      await context.model.Institution.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (institution) => ({ institutionId: institution.id })
    );
  },
  categories: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {
      dateRange: required(args.dateRange),
    });

    return withScope(
      await context.utilities.getCategories(context, scope, {
        changeThreshold: optional(args.changeThreshold),
      }),
      scope,
      (category) => ({ categoryId: category.id })
    );
  },
  vendors: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    return withScope(
      await context.model.Vendor.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (vendor) => ({ vendorId: vendor.id })
    );
  },
  accounts: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    return withScope(
      await context.model.Account.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (account) => ({ accountId: account.id })
    );
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {
      entityId: optional(args.entityId),
      accountId: optional(args.accountId),
    });

    return context.utilities.getTransactions(context, scope, {
      dateRange: required(args.dateRange),
      pagination: optional(args.pagination),
    });
  },
  properties: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    return withScope(
      await context.model.Property.findMany.load({
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (property) => ({ propertyId: property.id })
    );
  },

  currentBalance: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        where: {
          entity: {
            includeInOverall: true,
          },
        },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balance = await context.utilities.getDailyBalance(context, scope, {
      accountIds,
      dateRange: { start: today(), end: today() },
    });

    return balance.length > 0 ? balance[0].balance : 0;
  },
  monthlyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balances = await context.utilities.getMonthlyBalance(context, scope, {
      accountIds,
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      monthlyBalanceId: balance.id,
    }));
  },
  dailyBalance: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {});

    const accountIds = (
      await context.model.Account.findMany.load({
        select: { id: true },
        orderBy: [{ id: "asc" }],
      })
    ).map(asId);

    const balances = await context.utilities.getDailyBalance(context, scope, {
      accountIds,
      dateRange: args.dateRange,
    });

    return withScope(balances, scope, (balance) => ({
      dailyBalanceId: balance.id,
    }));
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(context.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(scope, args.dateRange);
  },
};
