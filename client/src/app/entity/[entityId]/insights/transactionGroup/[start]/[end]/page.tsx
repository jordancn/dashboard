"use client";

import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { Spinner } from "@/Atoms/Spinner";
import {
  useTransactionGroupOverviewQuery,
  useTransactionGroupQuery,
} from "@/GraphQL/client.gen";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { SectionHeading } from "@/Molecules/SectionHeading";
import { TransactionCards } from "@/Organisms/TransactionCards";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { formatLongMonthYear, toDateIso } from "@/Utils/date-iso";
import {
  hasEnd,
  hasEntityId,
  hasStart,
  useRouteParams,
} from "@/Utils/param-helpers";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

const TransactionGroup = () => {
  const { entityId, start, end } = useRouteParams(
    {},
    hasEntityId,
    hasStart,
    hasEnd,
  );
  const router = useRouter();

  const results =
    entityId && entityId !== "overview"
      ? useTransactionGroupQuery({
          variables: {
            entityId,
            transactionsDateRange: {
              start,
              end,
            },
          },
        })
      : useTransactionGroupOverviewQuery({
          variables: {
            transactionsDateRange: {
              start,
              end,
            },
          },
        });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, []);

  const transactions = React.useMemo(() => {
    if (results.loading) {
      return [];
    }

    if (!results.data) {
      return [];
    }

    const t =
      "entity" in results.data
        ? results.data.entity?.transactions
        : "transactions" in results.data
          ? results.data.transactions
          : [];

    return (t || []).map((transaction) => ({
      id: transaction.id,
      date: transaction.date,
      vendorName: transaction.vendor?.name || transaction.description,
      categoryName: transaction.category?.name,
      amount: transaction.amount,
      pending: transaction.pending,
      image: transaction.vendor?.image || undefined,
    }));
  }, [results]);

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

  return (
    <>
      <NavigationBar>
        <div className={styles.navigation}>
          <div className={styles.backButton} onClick={onBackClicked}>
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.insights}>{previousScreenTitle}</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <SectionHeading title={formatLongMonthYear(toDateIso(start))} />

        <div className={styles.transactionCards}>
          <TransactionCards transactions={transactions} entityId={entityId} />
        </div>
      </ContentScrollable>
    </>
  );
};

export default TransactionGroup;
