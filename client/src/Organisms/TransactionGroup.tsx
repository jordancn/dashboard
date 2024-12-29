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
import { DateIso, formatLongMonthYear } from "@/Utils/date-iso";
import { getWidthClassName } from "@/Utils/helpers";
import {
  hasEnd,
  hasEntityId,
  hasStart,
  useRouteParams,
} from "@/Utils/param-helpers";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
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

  const { entityId, start, end } = useRouteParams(
    {},
    hasEntityId,
    hasStart,
    hasEnd,
  );

  const results = useQuery({
    entityId,
    start,
    end,
  });

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
        <div className={styles.navigationBar}>
          <div className={styles.backButtonContainer} onClick={onBackClicked}>
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.title}>{previousScreenTitle}</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <SectionHeading title={formatLongMonthYear(start)} />

        <div
          className={classNames(styles.transactionCardsContainer, {
            ...getWidthClassName("full"),
          })}
        >
          <TransactionCards transactions={transactions} entityId={entityId} />
        </div>
      </ContentScrollable>
    </>
  );
};
