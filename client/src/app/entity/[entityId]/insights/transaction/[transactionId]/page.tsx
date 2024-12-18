"use client";

import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { NavigationChevron } from "@/Atoms/NavigationChevron";
import { Spinner } from "@/Atoms/Spinner";
import { Subheadline } from "@/Atoms/Subheadline";
import { useTransactionQuery } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { getWidthClassName, useRouteParams } from "@/Utils/helpers";
import { assertIsIsEntityAndTransactionParams } from "@/Utils/param-helpers";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

const Transaction = () => {
  const router = useRouter();

  const params = useRouteParams(assertIsIsEntityAndTransactionParams);
  // const navigate = useNavigate();

  const results = useTransactionQuery({
    variables: {
      transactionId: params.transactionId,
    },
  });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

  // const onMerchantClick = React.useCallback(() => {
  //   const transaction = results.data?.transaction;

  //   if (!transaction) {
  //     return;
  //   }

  //   // TODO
  //   // navigate(
  //   //   `/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/vendor?description=${transaction?.description}`,
  //   // );
  // }, []);

  // const onCategoryClick = React.useCallback(() => {
  //   // TODO
  //   //  navigate(
  //   //   `/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/category?description=${transaction?.description}`,
  //   // );
  // }, []);

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
              <NavigationChevron />
            </div>
            <div className={styles.navigationBarTitle}>
              <>Back</>
              {/* {props.mode === "insights" ? (
                <>Insights</>
              ) : (
                <>Back</>
              )} */}
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable>
        <div
          className={classNames(styles.cards, {
            ...getWidthClassName("full"),
          })}
        >
          {transaction.vendor?.image && (
            <Image
              alt={transaction.vendor?.name || ""}
              src={`data:image/png;base64,${transaction.vendor.image}`}
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
        <div
          className={classNames(styles.cardAccount, {
            ...getWidthClassName("full"),
          })}
        >
          <Card size="full">
            <CardContents position="start">
              <div className={styles.cardAccountHeader}>
                <div className={styles.cardAccountHeaderAccountContainer}>
                  <div>
                    <Caption1 weight="Bold" title={transaction.account?.name} />
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
          <Card size="full">
            <CardContents position="middle">
              <div className={styles.cardAccountDescriptionContainer}>
                <div className={styles.cardAccountDescription}>
                  <div>
                    <Caption1 weight="Bold" title="Description" />
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
            size="full"
            href={`/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/category?description=${transaction?.description}`}
          >
            <CardContents position="middle">
              <div className={styles.categoryContainer}>
                <div className={styles.categoryName}>
                  <div>
                    <Caption1 weight="Bold" title="Category" />
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
            size="full"
            href={`/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/vendor?description=${transaction?.description}`}
          >
            <CardContents position="end">
              <div className={styles.merchantContainer}>
                <div className={styles.merchantName}>
                  <div>
                    <Caption1 weight="Bold" title="Merchant" />
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
          {transaction.vendor?.name === "Amazon" && (
            <Card
              size="full"
              href={`/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/amazon-order-details?description=${transaction?.description}`}
            >
              <CardContents position="end">
                <div className={styles.amazonContainer}>
                  <div className={styles.amazonDetails}>
                    <div>
                      <Caption1 weight="Bold" title="Details" />
                    </div>
                    <div>
                      {/* https://www.amazon.com/gp/your-account/order-details/?orderID=111-3298699-4870603 */}
                      <Caption1
                        title="111-3298699-4870603"
                        ordinal="Secondary"
                      />
                    </div>
                  </div>
                  <div className={styles.amazonChevron}>
                    <Chevron />
                  </div>
                </div>
              </CardContents>
            </Card>
          )}
          {/* <Card size='single'>
            <CardContents position='end'>
              <div
                css={css`
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  height: 150px;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                  `}
                >
                  <div>
                    <Headline title='Notes' />
                  </div>
                  <div>
                    <TextInput onChange={() => {}} value='' placeholder='' multiline />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card> */}
        </div>
      </ContentScrollable>
    </>
  );
};

export default Transaction;
