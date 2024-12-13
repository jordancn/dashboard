import { Context } from "@/context";
import { Parent } from "@/resolvers/helpers";
import { MutationResolvers } from "@/types/graphql/server.gen";
import { v4 } from "uuid";

export const mutationResolvers: MutationResolvers<Context, Parent> = {
  addVendor: async (parent, args, context, info) => {
    const id = v4();

    await context.prisma.vendor.create({
      data: {
        id: id,
        name: args.name,
      },
    });

    return {
      id,
      scope: {
        vendorId: id,
      },
    };
  },

  addCategory: async (parent, args, context, info) => {
    const id = v4();

    await context.prisma.category.create({
      data: {
        id: id,
        name: args.name,
      },
    });

    return {
      id,
      scope: {
        categoryId: id,
      },
    };
  },

  setCategory: async (parent, args, context, info) => {
    const categoryId = args.categoryId;

    await context.prisma.transaction.update({
      where: {
        id: args.transactionId,
      },
      data: {
        ...(categoryId
          ? {
              categoryId,
            }
          : {
              category: {
                disconnect: true,
              },
            }),
      },
    });

    return {
      id: args.transactionId,
      scope: {
        transactionId: args.transactionId,
      },
    };
  },
  setVendor: async (parent, args, context, info) => {
    await context.prisma.transaction.update({
      where: {
        id: args.transactionId,
      },
      data: {
        vendorId: args.vendorId || null,
      },
    });

    return {
      id: args.transactionId,
      scope: {
        transactionId: args.transactionId,
      },
    };
  },
};
