"use client";

import { NavigationChevronLeft } from "@/Atoms/NavigationChevronLeft";
import { Spinner } from "@/Atoms/Spinner";
import { Title1 } from "@/Atoms/Title1";
import { useTransactionVendorQuery } from "@/GraphQL/client.gen";
import { NavigationBar } from "@/Molecules/NavigationBar";
import { usePreviousScreenTitle } from "@/Molecules/NavigationBar.helpers";
import { TransactionNewVendorCard } from "@/Organisms/TransactionNewVendorCard";
import { TransactionVendorCard } from "@/Organisms/TransactionVendorCard";
import { ContentScrollable } from "@/Templates/ContentScrollable";
import { Defined } from "@/Types/core";
import { getRelativePosition, useRouteParams } from "@/Utils/helpers";
import { assertIsIsEntityAndTransactionParams } from "@/Utils/param-helpers";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import styles from "./page.module.css";

type Vendor = Defined<
  ReturnType<typeof useTransactionVendorQuery>["data"]
>["vendors"][number];

type Transaction = Defined<
  Defined<ReturnType<typeof useTransactionVendorQuery>["data"]>["transaction"]
>;

const Vendors = ({
  vendors,
  transaction,
}: {
  vendors: Vendor[];
  transaction: Transaction;
}) => {
  const { vendor: transactionVendor } = transaction;
  const transactionVendorId = transactionVendor?.id;

  const vendorsWithNewVendorEntry = useMemo(
    () => [undefined, ...vendors],
    [vendors],
  );

  const vendorCards = useMemo(
    () =>
      _.compact(
        vendorsWithNewVendorEntry.map((vendor, index, vendors) => {
          if (vendor === undefined) {
            return null;
          }

          return (
            <TransactionVendorCard
              vendor={vendor}
              isChecked={vendor.id === transactionVendorId}
              transaction={transaction}
              key={index}
              position={getRelativePosition(index, vendors)}
            />
          );
        }),
      ),
    [vendorsWithNewVendorEntry, transactionVendorId],
  );

  return (
    <div>
      <div>{vendorCards}</div>
    </div>
  );
};

const TransactionVendor = () => {
  const router = useRouter();

  const { transactionId } = useRouteParams(
    assertIsIsEntityAndTransactionParams,
  );

  const results = useTransactionVendorQuery({
    variables: {
      transactionId,
    },
  });

  const onBackClicked = React.useCallback(() => {
    router.back();
  }, [router]);

  const transaction = results.data?.transaction;

  const vendors = useMemo(
    () => _.compact([undefined, ...(results.data?.vendors || [])]),
    [results.data?.vendors],
  );

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

  if (!transaction) {
    return null;
  }

  return (
    <>
      <NavigationBar>
        <div className={styles.root}>
          <div className={styles.backButtonContainer} onClick={onBackClicked}>
            <div>
              <NavigationChevronLeft />
            </div>
            <div className={styles.transactionLabel}>{previousScreenTitle}</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div className={styles.titleContainer}>
          <Title1 weight="Bold" title="Merchant" />
        </div>

        <div className={styles.currentVendor}>
          <TransactionVendorCard
            position="single"
            isChecked={!transaction.vendor}
            transaction={transaction}
          />
        </div>

        <div className={styles.vendorList}>
          <TransactionNewVendorCard transactionId={transactionId} />

          <Vendors vendors={vendors} transaction={transaction} />
        </div>
      </ContentScrollable>
    </>
  );
};

export default TransactionVendor;
