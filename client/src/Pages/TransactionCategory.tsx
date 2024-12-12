import { CategoryType, useTransactionCategoryQuery } from "@/app/client.gen";
import { today } from "@/Utils/date-iso";
import { useRelativeSize, useRouteParams } from "@/Utils/helpers";
import _ from "lodash";
import React from "react";
import { Empty } from "../Atoms/Empty";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { CardTitle } from "../Molecules/CardTitle";
import { NavigationBar } from "../Molecules/NavigationBar";
import { ContentScrollable } from "../Templates/Content";
import styles from "./TransactionCategory.module.css";
import { TransactionCategoryCard } from "./TransactionCategoryCard";
import { TransactionNewCategoryCard } from "./TransactionNewCategoryCard";

export const TransactionCategory = () => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{ entityId: string; transactionId: string }>();

  // const search = useLocation().search;
  // const description = new URLSearchParams(search).get('description');
  // TODO
  const description = "";

  // const navigate = useNavigate();

  const results = useTransactionCategoryQuery({
    variables: {
      transactionId: params.transactionId,
      dateRange: { start: today(), end: today() },
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
          <div
            className={styles.navigationBarBackButtonContainer}
            onClick={onBackClicked}
          >
            <div>
              <NavigationChevron />
            </div>
            <div className={styles.navigationBarBackButtonContainerTitle}>
              Transaction
            </div>
          </div>
        </div>
      </NavigationBar>
      <ContentScrollable type="wrap-cards">
        <div
          style={{ width: `${size}px` }}
          className={styles.transactionCardsContainer}
        >
          <TransactionCategoryCard
            position="start"
            isChecked={!transaction.category}
            transaction={transaction}
          />
          <TransactionNewCategoryCard
            position="end"
            placeholder={description || ""}
            transaction={transaction}
          />
        </div>

        <CardTitle title="Income" />
        <div
          style={{ width: `${size}px` }}
          className={styles.incomeCardsContainer}
        >
          {_.orderBy(
            results.data?.categories || [],
            (category) => category.name,
          )
            .filter((category) => category.categoryType === CategoryType.Income)
            .map((category, index, thing) => {
              return (
                <TransactionCategoryCard
                  category={category}
                  isChecked={category.id === transaction.category?.id}
                  transaction={transaction}
                  key={category.id}
                  position={
                    index === 0
                      ? "start"
                      : index + 1 === thing.length
                        ? "end"
                        : "middle"
                  }
                />
              );
            })}
        </div>

        <CardTitle title="Expense" />
        <div
          style={{ width: `${size}px` }}
          className={styles.expenseCardsContainer}
        >
          {_.orderBy(
            results.data?.categories || [],
            (category) => category.name,
          )
            .filter(
              (category) => category.categoryType === CategoryType.Expense,
            )
            .map((category, index, thing) => {
              return (
                <TransactionCategoryCard
                  category={category}
                  isChecked={category.id === transaction.category?.id}
                  transaction={transaction}
                  key={category.id}
                  position={
                    index === 0
                      ? "start"
                      : index + 1 === thing.length
                        ? "end"
                        : "middle"
                  }
                />
              );
            })}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
