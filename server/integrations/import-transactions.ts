import { createPrismaClient } from "@/prisma/prisma-client";
import { toIsoDate } from "@/utils/date-iso";
import { DateTimeIso, now, toIsoDateTime } from "@/utils/date-time-iso";
import * as fs from "fs";
import _, { padStart } from "lodash";
const ofx = require("ofx");

type OFXTransactionsResponse = {
  OFX?: {
    CREDITCARDMSGSRSV1?: {
      CCSTMTTRNRS?: {
        CCSTMTRS?: {
          BANKTRANLIST?: {
            DTSTART: string;
            DTEND: string;
            STMTTRN?: Array<{
              TRNTYPE: "DEBIT" | "CREDIT";
              DTPOSTED: string;
              TRNAMT: string;
              FITID: string;
              NAME: string;
            }>;
          };
          LEDGERBAL: {
            BALAMT: string;
            DTASOF: string;
          };
          AVAILBAL: {
            BALAMT: string;
            DTASOF: string;
          };
        };
      };
    };
  };
};

const parse: (sgml: string) => OFXTransactionsResponse = ofx.parse;

type Transactions = Array<{
  date: string;
  description: string;
  amount: number;
  availableBalance: number;
  pending: boolean;
}>;

type Data = {
  fileName: string;
  date: string;
  account: string;
  transactions: Transactions;
};

const getBalance = (ofxTransactionResponse: OFXTransactionsResponse) => {
  return Number.parseFloat(
    ofxTransactionResponse?.OFX?.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS
      ?.LEDGERBAL?.BALAMT || "0"
  );
};

const getTransactions = (ofxTransactionResponse: OFXTransactionsResponse) => {
  return _.orderBy(
    (
      ofxTransactionResponse?.OFX?.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS
        ?.BANKTRANLIST?.STMTTRN || []
    ).map((transaction) => {
      const date = transaction.DTPOSTED.replace(
        /^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})(.*)$/,
        "$1-$2-$3 $4:$5:$6"
      );

      return {
        date,
        description: transaction.NAME,
        amount: Number.parseFloat(transaction.TRNAMT),
        availableBalance: 0,
        pending: false,
      };
    }),
    (t) => t.date
  );
};

const main = async () => {
  const date = process.argv?.[2];

  const fileNames = await fs.promises.readdir("/data");

  const data: Data[] = await Promise.all([
    ...fileNames
      .filter((fileName) =>
        fileName.startsWith(`${date}-bank-of-america-transactions`)
      )
      .map(async (fileName) => {
        const contents: Data = JSON.parse(
          await fs.promises.readFile(`/data/${fileName}`, {
            encoding: "utf-8",
          })
        );

        return {
          ...contents,
          fileName: fileName,
          transactions: contents.transactions.map((transaction) => {
            const date = transaction.date.replace(
              /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/,
              "$3-$1-$2"
            );

            return {
              ...transaction,
              date,
            };
          }),
        };
      }),
    ...fileNames
      .filter((fileName) => fileName.startsWith(`${date}-Chase`))
      .map(async (fileName) => {
        const contents = parse(
          await fs.promises.readFile(`/data/${fileName}`, {
            encoding: "utf-8",
          })
        );

        const account = fileName
          .replace(/^.*Chase\-/, "")
          .replace(/[^0-9]/g, "");

        return {
          account,
          fileName: fileName,
          date,
          transactions: getTransactions(contents),
        };
      }),
  ]);

  const balances = await Promise.all(
    fileNames
      .filter((fileName) => fileName.startsWith(`${date}-Chase`))
      .map(async (fileName) => {
        const contents = parse(
          await fs.promises.readFile(`/data/${fileName}`, {
            encoding: "utf-8",
          })
        );

        const account = fileName
          .replace(/^.*Chase\-/, "")
          .replace(/[^0-9]/g, "");

        return {
          account,
          fileName: fileName,
          date,
          balance: getBalance(contents),
        };
      })
  );

  const prisma = createPrismaClient();

  for (const balance of balances) {
    const account = await prisma.account.findFirst({
      where: { number: balance.account },
    });

    if (!account) {
      throw new Error(`Could not find account for account: ${balance.account}`);
    }

    await prisma.balance.create({
      data: {
        balance: balance.balance,
        accountId: account.id,
      },
    });
  }

  const deleted = await prisma.transaction.deleteMany({
    where: {
      pending: true,
    },
  });

  console.info(`Deleted ${deleted.count} pending transactions`);

  for (const datum of data) {
    const accountNumberString = datum.account;

    const accountNumber = accountNumberString.replace(/[^0-9]/g, "");

    const transactions: Array<{
      addedAt: DateTimeIso;
      description: string;
      amount: number;
      availableBalance: number;
      date: Date;
      accountId: string;
      categoryId: string | undefined;
      vendorId: string | undefined;
      pending: boolean;
    }> = [];

    for (const transaction of datum.transactions) {
      const amount = transaction.amount;
      const availableBalance = transaction.availableBalance;

      const account = await prisma.account.findFirst({
        where: { number: accountNumber },
      });

      if (!account) {
        throw new Error(
          `Could not find account for transaction: ${transaction}`
        );
      }

      const searchDescription = transaction.description
        .replace(/\ ON\ [0-9]{2}\/[0-9]{2}$/, "")
        .replace("ACH HOLD ", "")
        .replace("ACH CREDIT ", "");

      const results: Array<{
        vendorId: string | null;
        categoryId: string | null;
      }> = await prisma.$queryRawUnsafe(
        /*sql*/ `
            SELECT
              "vendorId",
              "categoryId"
            FROM
              "Transaction"
            WHERE
              dmetaphone(description) = dmetaphone($1)
              AND dmetaphone_alt(description) = dmetaphone_alt($1)
              AND pending IS FALSE
              AND "accountId" = '${account.id}'
            ORDER BY
              date DESC,
              "addedAt" ASC
            LIMIT 1
          `,
        searchDescription
      );

      const dateParts = transaction.date.split("-");
      const date = `${padStart(dateParts[0], 4, "0")}-${padStart(
        dateParts[1],
        2,
        "0"
      )}-${padStart(dateParts[2], 2, "0")}`;

      transactions.push({
        accountId: account.id,
        addedAt: toIsoDateTime(`${now()}+00`),
        description: transaction.description,
        amount,
        availableBalance: availableBalance,
        date: new Date(toIsoDate(date)),
        categoryId: results[0]?.categoryId || undefined,
        vendorId: results[0]?.vendorId || undefined,
        pending: transaction.pending,
      });
    }

    const result = await prisma.transaction.createMany({
      data: transactions,
      skipDuplicates: true,
    });

    console.info(
      `${datum.date} Imported ${result.count} of ${transactions.length} transactions for account '${datum.account}'`
    );

    const accountIds = _.uniq(
      transactions
        .map((transaction) => transaction.accountId)
        .filter((accountId) => !!accountId)
    );

    const accountId = _.first(accountIds);

    if (accountId) {
      await prisma.refreshLog.create({
        data: {
          accountId,
          refreshedAt: new Date(),
        },
      });
    }
  }
};

void main();
