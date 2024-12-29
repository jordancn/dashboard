"use client";

import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { Spinner } from "@/Atoms/Spinner";
import { Subheadline } from "@/Atoms/Subheadline";
import { useTransactionQuery } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { getWidthClassName } from "@/Utils/helpers";
import {
  hasEntityId,
  hasTransactionId,
  useRouteParams,
} from "@/Utils/param-helpers";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./page.module.css";

const Transaction = () => {
  const router = useRouter();

  const { transactionId, entityId } = useRouteParams(
    {},
    hasTransactionId,
    hasEntityId,
  );

  const results = useTransactionQuery({
    variables: {
      transactionId,
    },
  });

  const onBackClicked = useCallback(() => {
    router.back();
  }, [router]);

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
          <div
            className={styles.navigationBarBackButtonContainer}
            onClick={onBackClicked}
          >
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.navigationBarTitle}>
              {previousScreenTitle}
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable>
        <div className={styles.header}>
          <div
            className={classNames(styles.image, {
              ...getWidthClassName("full"),
            })}
          >
            {transaction.vendor?.image && (
              <Image
                alt={transaction.vendor?.name || ""}
                src={`data:image/png;base64,${transaction.vendor.image}`}
                width={45}
                height={45}
              />
            )}
          </div>
          <div
            className={classNames(styles.cardSubheadline, {
              ...getWidthClassName("full"),
            })}
          >
            <Subheadline title={transaction.vendor?.name || ""} />
          </div>
          <div
            className={classNames(styles.cardAmount, {
              ...getWidthClassName("full"),
            })}
          >
            <TransactionAmount
              value={transaction.amount}
              formatter={formatCurrency.format}
              size="large"
            />
          </div>
          <div
            className={classNames(styles.cardDate, {
              ...getWidthClassName("full"),
            })}
          >
            {transaction.pending && <Caption1 title="Pending" />}
            {!transaction.pending && (
              <Caption1 title={formatDate(transaction.date)} />
            )}
          </div>
        </div>
        <div
          className={classNames(styles.cardAccount, {
            ...getWidthClassName("full"),
          })}
        >
          <Card withSeparators>
            <CardContents position="start">
              <div className={styles.cardAccountHeader}>
                <div className={styles.cardAccountHeaderAccountContainer}>
                  <div>
                    <Subheadline
                      weight="Bold"
                      title={transaction.account?.name}
                    />
                  </div>
                  <div>
                    <Caption1 title="Account Number" ordinal="Secondary" />
                  </div>
                </div>
                <div className={styles.cardAccountHeaderAccountNumberContainer}>
                  <div>
                    <Caption1
                      title={`· · · · ${transaction.account?.number}`}
                      ordinal="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card withSeparators>
            <CardContents position="middle">
              <div className={styles.cardAccountDescriptionContainer}>
                <div className={styles.cardAccountDescription}>
                  <div>
                    <Subheadline weight="Bold" title="Description" />
                  </div>
                  <div>
                    <Caption1
                      title={transaction.description}
                      ordinal="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card
            href={`/entity/${entityId || "overview"}/insights/transaction/${transactionId}/category`}
            withSeparators
          >
            <CardContents position="middle">
              <div className={styles.categoryContainer}>
                <div className={styles.categoryName}>
                  <div>
                    <Subheadline weight="Bold" title="Category" />
                  </div>
                  <div>
                    <Caption1
                      title={transaction.category?.name || "No Category"}
                      ordinal="Secondary"
                    />
                  </div>
                </div>
                <div className={styles.categoryChevron}>
                  {!transaction.pending && <Chevron />}
                </div>
              </div>
            </CardContents>
          </Card>
          <Card
            href={`/entity/${entityId || "overview"}/insights/transaction/${transactionId}/vendor`}
            withSeparators
          >
            <CardContents position="end">
              <div className={styles.merchantContainer}>
                <div className={styles.merchantName}>
                  <div>
                    <Subheadline weight="Bold" title="Merchant" />
                  </div>
                  <div>
                    <Caption1
                      title={transaction.vendor?.name || "No Vendor"}
                      ordinal="Secondary"
                    />
                  </div>
                </div>
                <div className={styles.merchantChevron}>
                  {!transaction.pending && <Chevron />}
                </div>
              </div>
            </CardContents>
          </Card>
        </div>
      </ContentScrollable>
    </>
  );
};

export default Transaction;
