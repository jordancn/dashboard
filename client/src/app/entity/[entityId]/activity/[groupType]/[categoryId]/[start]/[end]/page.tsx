"use client";

import { Caption1 } from "@/Atoms/Caption1";
import { Headline } from "@/Atoms/Headline";
import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { Spinner } from "@/Atoms/Spinner";
import { Title1 } from "@/Atoms/Title1";
import {
  useTransactionCategoryGroupOverallQuery,
  useTransactionCategoryGroupQuery,
} from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { TransactionCards } from "@/Organisms/TransactionCards";
import { useActivityGroup } from "@/Providers/AppStateProvider";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { formatCurrency, getNamedDateRange } from "@/Utils/formatters";
import { getActivityGroupBy, useRouteParams } from "@/Utils/helpers";
import { assertIsTransactionCategoryGroupParams } from "@/Utils/param-helpers";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

const TransactionsCategory = () => {
  const router = useRouter();

  const { categoryId, end, entityId, start } = useRouteParams(
    assertIsTransactionCategoryGroupParams,
  );

  const activityGroup = useActivityGroup();

  const results =
    entityId === "overview"
      ? useTransactionCategoryGroupOverallQuery({
          variables: {
            dateRange: {
              start,
              end,
            },
            categoryId,
            groupBy: getActivityGroupBy(activityGroup),
          },
        })
      : useTransactionCategoryGroupQuery({
          variables: {
            entityId,
            dateRange: {
              start,
              end,
            },
            categoryId,
            groupBy: getActivityGroupBy(activityGroup),
          },
        });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

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

  if (!category) {
    return null;
  }

  const transactions = category.transactions || [];

  return (
    <>
      <NavigationBar>
        <div className={styles.root}>
          <div className={styles.backButton} onClick={onBackClicked}>
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.insights}>{previousScreenTitle}</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div className={styles.titleContainer}>
          <Title1 weight="Bold" title={category.name || ""} />
        </div>
        <div className={styles.cards}>
          <Card>
            <CardTitle />
            <CardContents variant="transparent">
              <div className={styles.cardContents}>
                <div className={styles.dateRangeTotalContainer}>
                  <div className={styles.dateRange}>
                    <Headline
                      weight="Bold"
                      title={getNamedDateRange({
                        start,
                        end,
                      })}
                    />
                  </div>
                </div>
                <div className={styles.total}>
                  <div>{formatCurrency.format(category.total || 0)}</div>
                  <div>
                    <Caption1
                      title={`${category.count || 0} transactions`}
                      ordinal="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
        </div>

        <div>
          <div className={styles.transactionCards}>
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
              entityId={entityId}
            />
          </div>
        </div>
      </ContentScrollable>
    </>
  );
};

export default TransactionsCategory;
