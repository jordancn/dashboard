import {
  useTransactionCategoryGroupOverallQuery,
  useTransactionCategoryGroupQuery,
} from "@/app/client.gen";
import { DateIso, toDateIso } from "@/Utils/date-iso";
import { formatCurrency, getNamedDateRange } from "@/Utils/formatters";
import {
  getActivityGroupBy,
  useRelativeSize,
  useRouteParams,
} from "@/Utils/helpers";
import _ from "lodash";
import React from "react";
import { Caption1 } from "../Atoms/Caption1";
import { Empty } from "../Atoms/Empty";
import { Headline } from "../Atoms/Headline";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { CardTitle } from "../Molecules/CardTitle";
import { NavigationBar } from "../Molecules/NavigationBar";
import { SectionHeading } from "../Molecules/SectionHeading";
import { TransactionCards } from "../Organisms/TransactionCards";
import { ActivityGroup, useActivityGroup } from "../Providers/AppStateProvider";
import { ContentScrollable } from "../Templates/Content";
import styles from "./TransactionCategoryGroup.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
  categoryId: string;
  activityGroup: ActivityGroup;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const entityResults = useTransactionCategoryGroupQuery({
    variables: {
      entityId: args.entityId || "",
      dateRange: {
        start: args.start,
        end: args.end,
      },
      categoryId: args.categoryId,
      groupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  const overallResults = useTransactionCategoryGroupOverallQuery({
    variables: {
      dateRange: {
        start: args.start,
        end: args.end,
      },
      categoryId: args.categoryId,
      groupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const TransactionCategoryGroup = () => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{
    entityId: string | "overall";
    start: string;
    end: string;
    categoryId: string;
  }>();
  // const navigate = useNavigate();

  const activityGroup = useActivityGroup();

  const results = useQuery({
    entityId: params.entityId,
    start: toDateIso(params.start),
    end: toDateIso(params.end),
    categoryId: params.categoryId,
    activityGroup,
  });

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
  }, []);

  // const transactions = React.useMemo(() => {
  //   if (results.loading) {
  //     return [];
  //   }

  //   return (results.data?.entity?.category?.transactions || []).map((transaction) => ({
  //     id: transaction.id,
  //     date: transaction.date,
  //     vendorName: transaction.vendor?.name || transaction.description,
  //     categoryName: transaction.category?.name,
  //     amount: transaction.amount,
  //   }));
  // }, [results]);

  const category = React.useMemo(() => {
    if (!results.data) {
      return;
    }

    if ("entity" in results.data) {
      return results.data.entity?.category;
    }

    if ("category" in results.data) {
      return results.data.category;
    }
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
          <div className={styles.navigationBarBack} onClick={onBackClicked}>
            <div>
              <NavigationChevron />
            </div>
            <div className={styles.title}>Insights</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <SectionHeading title={category?.name || ""} />
        <div style={{ width: `${size}px` }} className={styles.cardContainer}>
          <Card size="single">
            <CardTitle />
            <CardContents>
              <div className={styles.cardContents}>
                <div className={styles.cardContentsLeft}>
                  <div className={styles.cardContentsHeadline}>
                    <Headline
                      title={getNamedDateRange({
                        start: toDateIso(params.start),
                        end: toDateIso(params.end),
                      })}
                    />
                  </div>
                  {/* <div>
                    <Subheadline title={formatDate(props.date)} variant='secondary' />
                  </div> */}
                </div>
                <div className={styles.cardContentsRight}>
                  <div>{formatCurrency.format(category?.total || 0)}</div>
                  <div>
                    <Caption1
                      title={`${category?.count || 0} transactions`}
                      color="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
        </div>

        {/* <SectionHeading title={formatLongMonthYear(isoStringToIsoDate(params.start))} /> */}

        {_.orderBy(
          category?.transactionGroups || [],
          (transactionGroup) => transactionGroup.start,
          "desc",
        ).map((transactionGroup) => {
          if (transactionGroup.transactions.length === 0) {
            return null;
          }

          return (
            <div key={transactionGroup.id}>
              <div
                style={{ width: `${size}px` }}
                className={styles.transactionsContainer}
              >
                <Card size="single">
                  <CardTitle />
                  <CardContents variant="transparent">
                    <div className={styles.transactionsContainerCard}>
                      <div
                        className={
                          styles.transactionsContainerCardHeadlineContainer
                        }
                      >
                        <div
                          className={styles.transactionsContainerCardHeadline}
                        >
                          <Headline
                            title={getNamedDateRange({
                              start: transactionGroup.start,
                              end: transactionGroup.end,
                            })}
                          />
                        </div>
                      </div>
                      <div className={styles.transactionsContainerCardRight}>
                        <div>
                          {formatCurrency.format(transactionGroup.total || 0)}
                        </div>
                        <div>
                          <Caption1
                            title={`${transactionGroup.count || 0} transactions`}
                            color="Secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContents>
                </Card>
              </div>

              <div
                style={{ width: `${size}px` }}
                className={styles.transactionsCards}
              >
                <TransactionCards
                  transactions={transactionGroup.transactions.map(
                    (transaction) => {
                      return {
                        amount: transaction.amount,
                        categoryName: transaction.category?.name || "",
                        date: transaction.date,
                        id: transaction.id,
                        vendorName:
                          transaction.vendor?.name || transaction.description,
                        pending: transaction.pending,
                      };
                    },
                  )}
                  entityId={params.entityId}
                />
              </div>
            </div>
          );
        })}

        {/* <TransactionAmount title={formatCurrency.format(category?.total || 0)} /> */}
      </ContentScrollable>
    </Empty>
  );
};
