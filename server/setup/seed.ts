import { faker } from "@faker-js/faker";
import {
  Account,
  AccountType,
  Budget,
  BudgetAmount,
  Entity,
  Institution,
  Prisma,
  PrismaClient,
  Transaction,
  Vendor,
} from "@prisma/client";
import * as _ from "lodash";
import { sample } from "lodash";

const prisma = new PrismaClient();

const records = <T extends Object>(count: number, fn: (index: number) => T) => {
  const result = _.uniqBy(
    Array.from({ length: count }).map((_, index) => fn(index)),
    (item: T) => JSON.stringify(_.omit(item, ["id"]))
  );

  console.table(result);

  return result;
};

const random = <T>(array: T[]) => {
  const element = sample(array);

  if (!element) {
    throw new Error("No element found");
  }

  return element;
};

const main = async () => {
  await prisma.transaction.deleteMany();
  await prisma.balance.deleteMany();
  await prisma.refreshLog.deleteMany();
  await prisma.budgetAmount.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.budgetAmount.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.account.deleteMany();
  await prisma.institution.deleteMany();
  await prisma.entity.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "Rent", categoryType: "Expense" },
      { name: "Utilities", categoryType: "Expense" },
      { name: "Groceries", categoryType: "Expense" },
      { name: "Gasoline", categoryType: "Expense" },
      { name: "Internet", categoryType: "Expense" },
      { name: "Phone Bill", categoryType: "Expense" },
      { name: "Subscription Services", categoryType: "Expense" },
      { name: "Dining Out", categoryType: "Expense" },
      { name: "Clothing", categoryType: "Expense" },
      { name: "Entertainment", categoryType: "Expense" },
      { name: "Healthcare", categoryType: "Expense" },
      { name: "Travel", categoryType: "Expense" },
      { name: "Car Maintenance", categoryType: "Expense" },
      { name: "Home Improvement", categoryType: "Expense" },
      { name: "Pet Expenses", categoryType: "Expense" },
      { name: "Vacation", categoryType: "Expense" },
      { name: "Savings", categoryType: "Income" },
      { name: "Tax Refund", categoryType: "Income" },
      { name: "Investment Returns", categoryType: "Income" },
      { name: "Dividend Income", categoryType: "Income" },
      { name: "Rental Income", categoryType: "Income" },
    ],
  });

  const categories = await prisma.category.findMany();

  await prisma.vendor.createMany({
    data: records<Vendor>(100, () => ({
      name: faker.company.name(),
      id: faker.string.uuid(),
      image: null,
    })),
  });

  await prisma.entity.createMany({
    data: records<Entity>(2, () => ({
      name: faker.company.name(),
      id: faker.string.uuid(),
      includeInOverall: true,
    })),
  });

  const entities = await prisma.entity.findMany();

  await prisma.institution.createMany({
    data: records<Institution>(5, () => ({
      name: faker.company.name(),
      id: faker.string.uuid(),
    })),
  });

  const institutions = await prisma.institution.findMany();

  await prisma.account.createMany({
    data: records<Account>(10, () => {
      const name = faker.finance.accountName();
      const number = faker.finance.accountNumber();

      const getAccountType = () => {
        if (name.includes("Credit")) {
          return AccountType.Credit;
        }

        if (name.includes("Loan")) {
          return AccountType.Loan;
        }

        if (name.includes("Investment")) {
          return AccountType.Investment;
        }

        return AccountType.Checking;
      };

      return {
        accountType: getAccountType(),
        entityId: entities[Math.floor(Math.random() * entities.length)].id,
        institutionId: random(institutions).id,
        name: `${name} - ${number.slice(number.length - 4)}`,
        number,
        id: faker.string.uuid(),
        externalId: null,
      };
    }),
  });

  const accounts = await prisma.account.findMany();

  await prisma.refreshLog.createMany({
    data: accounts.map((account) => ({
      accountId: account.id,
      id: faker.string.uuid(),
      refreshedAt: new Date(),
    })),
  });

  await prisma.budget.createMany({
    data: records<Budget>(20, () => ({
      entityId: random(entities).id,
      categoryId: random(categories).id,
      id: faker.string.uuid(),
    })),
  });

  const vendors = await prisma.vendor.findMany();

  const yearsOfData = 4;
  const transactionsPerDay = 5;
  const daysOfData = yearsOfData * 365;
  const totalTransactions = daysOfData * transactionsPerDay;

  await prisma.transaction.createMany({
    data: records<Transaction>(totalTransactions, () => {
      const pending = _.random(0, 1, true) <= 0.005;
      const daysAgo = _.random(0, daysOfData);

      return {
        id: faker.string.uuid(),
        accountId: random(accounts).id,
        addedAt: new Date(),
        amount: new Prisma.Decimal(faker.number.float({ min: 1, max: 1000 })),
        availableBalance: new Prisma.Decimal(
          faker.number.float({ min: 100, max: 10000 })
        ),
        categoryId: random(categories).id,
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        description: faker.finance.transactionDescription(),
        pending,
        vendorId: random(vendors).id,
      };
    }),
  });

  const budgets = await prisma.budget.findMany();

  await prisma.budgetAmount.createMany({
    data: records<BudgetAmount>(20, () => {
      const budgetId = random(budgets).id;

      return {
        budgetId,
        amount: new Prisma.Decimal(faker.number.int({ min: 100, max: 1000 })),
        id: faker.string.uuid(),
        startingAt: new Date(Date.now() - daysOfData * 24 * 60 * 60 * 1000),
      };
    }),
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
