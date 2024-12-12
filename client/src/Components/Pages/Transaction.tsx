import { useTransactionQuery } from "@/app/client.gen";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { useRelativeSize, useRouteParams } from "@/Utils/helpers";
import React from "react";
import { Caption1 } from "../Atoms/Caption1";
import { Chevron } from "../Atoms/Chevron";
import { Empty } from "../Atoms/Empty";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { Subheadline } from "../Atoms/Subheadline";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { NavigationBar } from "../Molecules/NavigationBar";
import { TransactionAmount } from "../Molecules/TransactionAmount";
import { ContentScrollable } from "../Templates/Content";
import styles from "./Transaction.module.css";

export const Transaction = (props: { mode: "insights" }) => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{ entityId: string; transactionId: string }>();
  // const navigate = useNavigate();

  const results = useTransactionQuery({
    variables: {
      transactionId: params.transactionId,
    },
  });

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
  }, []);

  const onMerchantClick = React.useCallback(() => {
    const transaction = results.data?.transaction;

    if (!transaction) {
      return;
    }

    // TODO
    // navigate(
    //   `/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/vendor?description=${transaction?.description}`,
    // );
  }, []);

  const onCategoryClick = React.useCallback(() => {
    // TODO
    //  navigate(
    //   `/entity/${params.entityId || "overview"}/insights/transaction/${params.transactionId}/category?description=${transaction?.description}`,
    // );
  }, []);

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

  const transaction = results.data?.transaction;

  if (!transaction) {
    return null;
  }

  return (
    <Empty>
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
              {props.mode === "insights" ? (
                <Empty>Insights</Empty>
              ) : (
                <Empty>Back</Empty>
              )}
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div style={{ width: `${size}px` }} className={styles.cards}>
          {transaction.vendor?.image && (
            <img
              alt={transaction.vendor?.name || ""}
              src={`data:image/png;base64,${transaction.vendor.image}`}
            />
          )}
        </div>

        <div style={{ width: `${size}px` }} className={styles.cardSubheadline}>
          <Subheadline title={transaction.vendor?.name || ""} />
        </div>

        <div style={{ width: `${size}px` }} className={styles.cardAmount}>
          <TransactionAmount
            title={formatCurrency.format(transaction.amount)}
          />
        </div>

        <div style={{ width: `${size}px` }} className={styles.cardDate}>
          {transaction.pending && <Caption1 title="Pending" />}
          {!transaction.pending && (
            <Caption1 title={formatDate(transaction.date)} />
          )}
        </div>

        <div style={{ width: `${size}px` }} className={styles.cardAccount}>
          <Card size="single">
            <CardContents position="start">
              <div className={styles.cardAccountHeader}>
                <div className={styles.cardAccountHeaderAccountContainer}>
                  <div>
                    <Caption1 weight="Bold" title={transaction.account?.name} />
                  </div>
                  <div>
                    <Caption1 title="Account Number" color="Secondary" />
                  </div>
                </div>
                <div className={styles.cardAccountHeaderAccountNumberContainer}>
                  <div>
                    <Caption1
                      title={`· · · · ${transaction.account?.number}`}
                      color="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card size="single">
            <CardContents position="middle">
              <div className={styles.cardAccountDescriptionContainer}>
                <div className={styles.cardAccountDescription}>
                  <div>
                    <Caption1 weight="Bold" title="Description" />
                  </div>
                  <div>
                    <Caption1
                      title={transaction.description}
                      color="Secondary"
                    />
                  </div>
                </div>
              </div>
            </CardContents>
          </Card>
          <Card
            size="single"
            onClick={!transaction.pending ? onCategoryClick : undefined}
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
                      color="Secondary"
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
            size="single"
            onClick={!transaction.pending ? onMerchantClick : undefined}
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
                      color="Secondary"
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
            <Card size="single" onClick={onMerchantClick}>
              <CardContents position="end">
                <div className={styles.amazonContainer}>
                  <div className={styles.amazonDetails}>
                    <div>
                      <Caption1 weight="Bold" title="Details" />
                    </div>
                    <div>
                      {/* https://www.amazon.com/gp/your-account/order-details/?orderID=111-3298699-4870603 */}
                      <Caption1 title="111-3298699-4870603" color="Secondary" />
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
    </Empty>
  );
};
