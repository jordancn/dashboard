import {
  useTransactionGroupOverviewQuery,
  useTransactionGroupQuery,
} from "@/app/client.gen";
import { DateIso, formatLongMonthYear, toDateIso } from "@/Utils/date-iso";
import { useRelativeSize, useRouteParams } from "@/Utils/helpers";
import React from "react";
import { Empty } from "../Atoms/Empty";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { NavigationBar } from "../Molecules/NavigationBar";
import { SectionHeading } from "../Molecules/SectionHeading";
import { TransactionCards } from "../Organisms/TransactionCards";
import { ContentScrollable } from "../Templates/Content";
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
  const size = useRelativeSize("single");
  const params = useRouteParams<{
    entityId: string;
    start: string;
    end: string;
  }>();
  // const navigate = useNavigate();

  const results = useQuery({
    entityId: params.entityId,
    start: toDateIso(params.start),
    end: toDateIso(params.end),
  });

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
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

  if (results.loading) {
    return (
      <Empty>
        <NavigationBar></NavigationBar>
        <ContentScrollable type="wrap-cards">
          <Spinner />
        </ContentScrollable>
      </Empty>
    );
  }

  return (
    <Empty>
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
          style={{ width: `${size}px` }}
          className={styles.transactionCardsContainer}
        >
          <TransactionCards
            transactions={transactions}
            entityId={params.entityId}
          />
        </div>
      </ContentScrollable>
    </Empty>
  );
};
