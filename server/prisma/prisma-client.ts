const highlightSql = require("igniculus")();
import { Prisma, PrismaClient } from "@prisma/client";
import { format as sqlFormat } from "sql-formatter";

const parseSqlParams = (str: string): string[] => {
  if (str.length === 0) {
    return [];
  }
  const result = str.slice(1, -1).split(",");

  // For reasons I don't understand the sql-formatter library ignores the
  // first parameter - so just sticking something in there to be ignored.
  return ["", ...result];
};

// export const createPrismaClient = (databaseUrl: string, queryLoggingEnabled: boolean) => {
export const createPrismaClient = (queryLoggingEnabled: boolean) => {
  const prisma = new PrismaClient({
    log: [
      ...(queryLoggingEnabled
        ? [{ emit: "event", level: "query" } as const]
        : []),
      "info",
      "warn",
      "error",
    ],
  });

  if (queryLoggingEnabled) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prisma.$on("query", (e: any) => {
      // eslint-disable-next-line no-console
      console.info(
        `${e.duration}ms`,
        highlightSql(
          sqlFormat(e.query, {
            language: "postgresql",
            uppercase: true,
            params: parseSqlParams(e.params),
          })
        ),
        "\n"
      );
    });
  }

  return prisma;
};
