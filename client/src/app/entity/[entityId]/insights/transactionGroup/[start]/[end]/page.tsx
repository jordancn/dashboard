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
import { DateIso, formatLongMonthYear, toDateIso } from "@/Utils/date-iso";
import {
  hasEnd,
  hasEntityId,
  hasStart,
  useRouteParams,
} from "@/Utils/param-helpers";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import styles from "./page.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
}) => {
  const useOverview = !!args.entityId && args.entityId !== "overview";

  const overviewResults = useTransactionGroupOverviewQuery({
    variables: {
      transactionsDateRange: {
        start: args.start,
        end: args.end,
      },
    },
    skip: !useOverview,
  });

  const entityResults = useTransactionGroupQuery({
    variables: {
      entityId: args.entityId || "",
      transactionsDateRange: {
        start: args.start,
        end: args.end,
      },
    },
    skip: useOverview,
  });

  if (useOverview) {
    return overviewResults;
  }

  return entityResults;
};

const TransactionGroup = () => {
  const { entityId, start, end } = useRouteParams(
    {},
    hasEntityId,
    hasStart,
    hasEnd,
  );
  const router = useRouter();

  const results = useQuery({ entityId, start, end });

  const onBackClicked = useCallback(() => {
    router.back();
  }, [router]);

  const transactions = useMemo(() => {
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
