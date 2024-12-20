import { NavigationChevron } from "@/Atoms/NavigationChevron";
import { Spinner } from "@/Atoms/Spinner";
import {
  useTransactionGroupOverviewQuery,
  useTransactionGroupQuery,
} from "@/GraphQL/client.gen";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { SectionHeading } from "@/Molecules/SectionHeading";
import { TransactionCards } from "@/Organisms/TransactionCards";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { DateIso, formatLongMonthYear, toDateIso } from "@/Utils/date-iso";
import { getWidthClassName, useRouteParams } from "@/Utils/helpers";
import { assertIsTransactionGroupParams } from "@/Utils/param-helpers";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./TransactionGroup.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const entityResults = useTransactionGroupQuery({
    variables: {
      entityId: args.entityId || "",
      transactionsDateRange: {
        start: args.start,
        end: args.end,
      },
    },
    skip: !isEntity,
  });

  const overallResults = useTransactionGroupOverviewQuery({
    variables: {
      transactionsDateRange: {
        start: args.start,
        end: args.end,
      },
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const TransactionGroup = () => {
  const router = useRouter();

  const params = useRouteParams(assertIsTransactionGroupParams);

  const results = useQuery({
    entityId: params.entityId,
    start: toDateIso(params.start),
    end: toDateIso(params.end),
  });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

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
        <div className={styles.navigationBar}>
          <div className={styles.backButtonContainer} onClick={onBackClicked}>
            <div>
              <NavigationChevron />
            </div>
            <div className={styles.title}>Insights</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <SectionHeading title={formatLongMonthYear(toDateIso(params.start))} />

        <div
          className={classNames(styles.transactionCardsContainer, {
            ...getWidthClassName("full"),
          })}
        >
          <TransactionCards
            transactions={transactions}
            entityId={params.entityId}
          />
        </div>
      </ContentScrollable>
    </>
  );
};
