import { Context } from "../context";
import {
  PropertyPurpose,
  PropertyResolvers,
  PropertyType,
} from "../types/graphql/server.gen";
import { optional, required } from "../utils/core";
import { toIsoDate } from "../utils/date-iso";
import { narrowScope, Parent, withScope } from "./helpers";

export const propertyResolvers: PropertyResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.propertyId);
  },
  externalId: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).externalId;
  },
  entity: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Property.findById.load(required(scope.propertyId))
        ).entityId,
      },
      scope,
      (id) => ({ entityId: id })
    );
  },
  address: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).address;
  },
  city: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).city;
  },
  state: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).state;
  },
  zip: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).zip;
  },
  propertyType: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).propertyType as PropertyType;
  },
  propertyPurpose: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).propertyPurpose as PropertyPurpose;
  },
  latitude: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).latitude.toNumber();
  },
  longitude: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).longitude.toNumber();
  },
  acquired: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const date = required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).acquired;

    if (!date) {
      return null;
    }

    return toIsoDate(date);
  },
  dispositioned: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    const date = required(
      await context.model.Property.findById.load(required(scope.propertyId))
    ).dispositioned;

    if (!date) {
      return null;
    }

    return toIsoDate(date);
  },
  transactions: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      categoryId: optional(args.categoryId),
      vendorId: optional(args.vendorId),
    });

    return context.utilities.getTransactions(context, scope, {
      dateRange: required(args.dateRange),
      pagination: optional(args.pagination),
    });
  },
  transactionGroups: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
      groupBy: required(args.groupBy),
    });

    return context.utilities.getTransactionGroups(scope, args.dateRange);
  },
  categories: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope, {
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
};
