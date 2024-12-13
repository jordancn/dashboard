import { Context } from "@/context";
import { narrowScope, Parent, withScope } from "@/resolvers/helpers";
import { TransactionResolvers } from "@/types/graphql/server.gen";
import { required } from "@/utils/core";
import { isoStringToIsoDate } from "@/utils/date-iso";

export const transactionResolvers: TransactionResolvers<Context, Parent> = {
  id: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(scope.transactionId);
  },
  account: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Transaction.findById.load(
            required(scope.transactionId)
          )
        ).accountId,
      },
      scope,
      (id) => ({ accountId: id })
    );
  },
  date: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return isoStringToIsoDate(
      required(
        await context.model.Transaction.findById.load(
          required(scope.transactionId)
        )
      ).date
    );
  },
  category: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Transaction.findById.load(
            required(scope.transactionId)
          )
        ).categoryId,
      },
      scope,
      (id) => ({ categoryId: id })
    );
  },
  description: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Transaction.findById.load(
        required(scope.transactionId)
      )
    ).description;
  },
  amount: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Transaction.findById.load(
        required(scope.transactionId)
      )
    ).amount.toNumber();
  },
  addedAt: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Transaction.findById.load(
        required(scope.transactionId)
      )
    ).addedAt;
  },
  property: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Transaction.findById.load(
            required(scope.transactionId)
          )
        ).propertyId,
      },
      scope,
      (id) => ({ propertyId: id })
    );
  },
  vendor: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      {
        id: required(
          await context.model.Transaction.findById.load(
            required(scope.transactionId)
          )
        ).vendorId,
      },
      scope,
      (id) => ({ vendorId: id })
    );
  },
  pending: async (parent, args, context, info) => {
    const scope = narrowScope(parent.scope);

    return (
      required(
        await context.model.Transaction.findById.load(
          required(scope.transactionId)
        )
      ).pending || false
    );
  },
};
