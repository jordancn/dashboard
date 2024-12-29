"use client";

import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { Spinner } from "@/Atoms/Spinner";
import { Title1 } from "@/Atoms/Title1";
import {
  CategoryType,
  useTransactionCategoryQuery,
} from "@/GraphQL/client.gen";
import { CardTitle } from "@/Molecules/CardTitle";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { TransactionCategoryCard } from "@/Organisms/TransactionCategoryCard";
import { TransactionNewCategoryCard } from "@/Organisms/TransactionNewCategoryCard";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { Defined } from "@/Types/core";
import { today } from "@/Utils/date-iso";
import { getRelativePosition } from "@/Utils/helpers";
import { hasTransactionId, useRouteParams } from "@/Utils/param-helpers";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import styles from "./page.module.css";

type Category = Defined<
  ReturnType<typeof useTransactionCategoryQuery>["data"]
>["categories"][number];

type Transaction = Defined<
  Defined<ReturnType<typeof useTransactionCategoryQuery>["data"]>["transaction"]
>;

const Categories = ({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: Transaction;
}) => {
  const { category: transactionCategory } = transaction;
  const transactionCategoryId = transactionCategory?.categoryId;

  const categoriesWithNewCategoryEntry = useMemo(
    () => [undefined, ...categories],
    [categories],
  );

  const categoryCards = useMemo(
    () =>
      _.compact(
        categoriesWithNewCategoryEntry.map((category, index, categories) => {
          if (!category) {
            return null;
          }

          if (!category.name) {
            return null;
          }

          return (
            <TransactionCategoryCard
              category={category}
              isChecked={category.categoryId === transactionCategoryId}
              transaction={transaction}
              key={index}
              position={getRelativePosition(index, categories)}
            />
          );
        }),
      ),
    [categories, transactionCategoryId],
  );

  return <>{categoryCards}</>;
};

const TransactionCategory = () => {
  const router = useRouter();

  const { transactionId } = useRouteParams({}, hasTransactionId);

  const results = useTransactionCategoryQuery({
    variables: {
      transactionId,
      dateRange: { start: today(), end: today() },
    },
  });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

  const categories = useMemo(
    () => results.data?.categories || [],
    [results.data?.categories],
  );

  const incomeCategories = useMemo(
    () =>
      _.orderBy(categories, (category) => category.name.toLowerCase()).filter(
        (category) => category.categoryType === CategoryType.Income,
      ),
    [categories],
  );

  const expenseCategories = useMemo(
    () =>
      _.orderBy(categories, (category) => category.name.toLowerCase()).filter(
        (category) => category.categoryType === CategoryType.Expense,
      ),
    [categories],
  );

  const previousScreenTitle = usePreviousScreenTitle();

  if (results.loading) {
    return (
      <>
        <NavigationBar></NavigationBar>
        <ContentScrollable type="wrap-cards">
          <Spinner />
        </ContentScrollable>
      </>
    );
  }

  const transaction = results.data?.transaction;

  if (!transaction) {
    return null;
  }

  return (
    <>
      <NavigationBar>
        <div className={styles.navigationBar}>
          <div className={styles.backButton} onClick={onBackClicked}>
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.transactionLabel}>{previousScreenTitle}</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div className={styles.titleContainer}>
          <Title1 weight="Bold" title="Category" />
        </div>

        <div className={styles.cards}>
          <TransactionCategoryCard
            position="single"
            isChecked={!transaction.category}
            transaction={transaction}
          />
        </div>

        <CardTitle title="Income" />
        <div className={styles.incomeCard}>
          <TransactionNewCategoryCard
            transaction={transaction}
            categoryType={CategoryType.Income}
          />
          <Categories categories={incomeCategories} transaction={transaction} />
        </div>

        <CardTitle title="Expense" />
        <div className={styles.expenseCard}>
          <TransactionNewCategoryCard
            transaction={transaction}
            categoryType={CategoryType.Expense}
          />
          <Categories
            categories={expenseCategories}
            transaction={transaction}
          />
        </div>
      </ContentScrollable>
    </>
  );
};

export default TransactionCategory;
