import { useTransactionVendorQuery } from "@/app/client.gen";
import { useRelativeSize, useRouteParams } from "@/Utils/helpers";
import _ from "lodash";
import React from "react";
import { Empty } from "../Atoms/Empty";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { NavigationBar } from "../Molecules/NavigationBar";
import { ContentScrollable } from "../Templates/Content";
import { TransactionNewVendorCard } from "./TransactionNewVendorCard";
import styles from "./TransactionVendor.module.css";
import { TransactionVendorCard } from "./TransactionVendorCard";

export const TransactionVendor = () => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{ entityId: string; transactionId: string }>();

  // const search = useLocation().search;
  // const description = new URLSearchParams(search).get("description");
  // TODO
  const description = "";

  // const navigate = useNavigate();

  const results = useTransactionVendorQuery({
    variables: {
      transactionId: params.transactionId,
    },
  });

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
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
          <div className={styles.backButtonContainer} onClick={onBackClicked}>
            <div>
              <NavigationChevron />
            </div>
            <div className={styles.title}>Transaction</div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div
          style={{ width: `${size}px` }}
          className={styles.transactionVendorContainer}
        >
          <TransactionVendorCard
            position="start"
            isChecked={!transaction.vendor}
            transaction={transaction}
          />
          <TransactionNewVendorCard
            position="end"
            placeholder={description || ""}
            transaction={transaction}
          />
        </div>

        <div
          style={{ width: `${size}px` }}
          className={styles.transactionVendorCards}
        >
          {_.orderBy(results.data?.vendors || [], (vendor) => vendor.name).map(
            (vendor, index, thing) => {
              return (
                <TransactionVendorCard
                  vendor={vendor}
                  isChecked={vendor.id === transaction.vendor?.id}
                  transaction={transaction}
                  key={vendor.id}
                  position={
                    index === 0
                      ? "start"
                      : index + 1 === thing.length
                        ? "end"
                        : "middle"
                  }
                />
              );
            },
          )}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
