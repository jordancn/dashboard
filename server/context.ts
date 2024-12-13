import { PrismaClient } from ".prisma/client";
import * as uuid from "uuid";
import { createPrismaClient } from "./prisma/prisma-client";
import { Scope } from "./scope";
import { Id } from "./types/core";
import { buildModel, Data } from "./utils/data-loaders";
import { Utilities, utilities } from "./utils/transaction-utils";

export const prisma = createPrismaClient(true);

export type Context = {
  requestId: Id;
  prisma: PrismaClient;
  scope: Scope;
  utilities: Utilities;
  model: Data;
};

export const context = (): Context => {
  const requestId = uuid.v4();

  return {
    requestId,
    prisma,
    utilities,
    model: buildModel(),
    scope: {},
  };
};
