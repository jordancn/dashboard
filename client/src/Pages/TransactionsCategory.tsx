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
import styles from "./TransactionsCategory.module.css";

const useQuery = (args: {
  entityId?: string;
  start: DateIso;
  end: DateIso;
  categoryId: string;
  activityGroup: ActivityGroup;
}) => {
  const isEntity = !!args.entityId && args.entityId !== "overview";

  const overallResults = useTransactionCategoryGroupOverallQuery({
    variables: {
      dateRange: {
        start: args.start, // getFirstDayOfYear(isoStringToIsoDate(params.start)),
        end: args.end,
      },
      categoryId: args.categoryId,
      groupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: isEntity,
  });

  const entityResults = useTransactionCategoryGroupQuery({
    variables: {
      entityId: args.entityId || "",
      dateRange: {
        start: args.start, // getFirstDayOfYear(isoStringToIsoDate(params.start)),
        end: args.end,
      },
      categoryId: args.categoryId,
      groupBy: getActivityGroupBy(args.activityGroup),
    },
    skip: !isEntity,
  });

  return isEntity ? entityResults : overallResults;
};

export const TransactionsCategory = () => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{
    entityId: string | "overall";
    start: string;
    end: string;
    categoryId: string;
  }>();
  // const navigate = useNavigate();

  const activityGroup = useActivityGroup();

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
  }, []);

  const results = useQuery({
    entityId: params.entityId,
    start: toDateIso(params.start),
    end: toDateIso(params.end),
    categoryId: params.categoryId,
    activityGroup,
  });

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

  const transactions = category?.transactions || [];

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
        <SectionHeading title={category?.name || ""} />
        <div style={{ width: `${size}px` }} className={styles.cardsContainer}>
          <Card size="single">
            <CardTitle />
            <CardContents variant="transparent">
              <div className={styles.cardContent}>
                <div className={styles.cardContentLeft}>
                  <div>
                    <div className={styles.cardContentLeftDate}>
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
                  <div className={styles.cardContentRight}>
                    <div>{formatCurrency.format(category?.total || 0)}</div>
                    <div>
                      <Caption1
                        title={`${category?.count || 0} transactions`}
                        color="Secondary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
        </div>

        {/* <SectionHeading title={formatLongMonthYear(isoStringToIsoDate(params.start))} /> */}

        <div>
          <div
            style={{ width: `${size}px` }}
            className={styles.transactionCards}
          >
            <TransactionCards
              transactions={transactions.map((transaction) => {
                return {
                  amount: transaction.amount,
                  categoryName: transaction.category?.name || "",
                  date: transaction.date,
                  id: transaction.id,
                  vendorName:
                    transaction.vendor?.name || transaction.description,
                  pending: transaction.pending,
                  image: transaction.vendor?.image || undefined,
                };
              })}
              entityId={params.entityId}
            />
          </div>
        </div>
      </ContentScrollable>
    </Empty>
  );
};
