import { Context } from "@/context";
import { narrowScope, Parent, withScope } from "@/resolvers/helpers";
import { InstitutionResolvers } from "@/types/graphql/server.gen";
import { required } from "@/utils/core";

export const institutionResolvers: InstitutionResolvers<Context, Parent> = {
  id: async (
    parent: Parent,
    args: unknown,
    context: Context,
    info: unknown
  ) => {
    const scope = narrowScope(parent.scope);

    return required(scope.institutionId);
  },
  name: async (
    parent: Parent,
    args: unknown,
    context: Context,
    info: unknown
  ) => {
    const scope = narrowScope(parent.scope);

    return required(
      await context.model.Institution.findById.load(
        required(scope.institutionId)
      )
    ).name;
  },
  accounts: async (
    parent: Parent,
    args: unknown,
    context: Context,
    info: unknown
  ) => {
    const scope = narrowScope(parent.scope);

    return withScope(
      await context.model.Account.findMany.load({
        select: { id: true },
        where: { institutionId: required(scope.institutionId) },
        orderBy: [{ id: "asc" }],
      }),
      scope,
      (account) => ({ accountId: account.id })
    );
  },
};
