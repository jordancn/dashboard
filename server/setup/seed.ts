import * as _ from "lodash";
import { createPrismaClient } from "../prisma/prisma-client";
import { required } from "../utils/core";
import { toIsoDate } from "../utils/date-iso";
import { configuration } from "./configuration";

const prisma = createPrismaClient(true);

const main = async () => {
  await prisma.transaction.deleteMany();
  await prisma.balance.deleteMany();
  await prisma.mortgage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.refreshLog.deleteMany();
  await prisma.value.deleteMany();
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
    data: _.uniq(
      configuration.mappings.map((mapping) => mapping.categoryName)
    ).map((categoryName) => ({ name: categoryName })),
    skipDuplicates: true,
  });

  await prisma.vendor.createMany({
    data: _.uniq(
      configuration.mappings.map((mapping) => mapping.merchantName)
    ).map((merchantName) => ({ name: merchantName })),
    skipDuplicates: true,
  });

  await prisma.entity.createMany({
    data: configuration.entityNames.map((entityName) => ({ name: entityName })),
    skipDuplicates: true,
  });

  await prisma.institution.createMany({
    data: configuration.institutionNames.map((institutionNames) => ({
      name: institutionNames,
    })),
    skipDuplicates: true,
  });

  await prisma.account.createMany({
    data: await Promise.all(
      configuration.accounts.map(async (account) => ({
        accountType: account.accountType,
        entityId: required(
          await prisma.entity.findFirst({ where: { name: account.entityName } })
        ).id,
        institutionId: required(
          await prisma.institution.findFirst({
            where: { name: account.institutionName },
          })
        ).id,
        name: account.accountName,
        number: account.accountNumber,
      }))
    ),
    skipDuplicates: true,
  });

  await prisma.property.createMany({
    data: await Promise.all(
      configuration.properties.map(async (property) => ({
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        latitude: property.latitude,
        longitude: property.longitude,
        externalId: property.externalId,
        propertyType: property.propertyType,
        propertyPurpose: property.propertyPurpose,
        entityId: required(
          await prisma.entity.findFirst({
            where: { name: property.entityName },
          })
        ).id,
      }))
    ),
    skipDuplicates: true,
  });

  for (const entity of configuration.budget) {
    const budget = entity.categories;

    await prisma.budget.createMany({
      data: await Promise.all(
        Object.keys(budget).map(async (categoryName) => {
          return {
            entityId: required(
              await prisma.entity.findFirst({
                where: { name: entity.entityName },
              })
            ).id,
            categoryId: required(
              await prisma.category.findFirst({
                where: { name: categoryName },
              })
            ).id,
          };
        })
      ),
    });

    await prisma.budgetAmount.createMany({
      data: await Promise.all(
        Object.keys(budget).map(async (categoryName) => {
          return {
            amount: (budget as any)[categoryName],
            startingAt: new Date(toIsoDate("2021-09-01")),
            budgetId: required(
              await prisma.budget.findFirst({
                where: {
                  category: { name: categoryName },
                  entity: { name: entity.entityName },
                },
              })
            ).id,
          };
        })
      ),
    });
  }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
