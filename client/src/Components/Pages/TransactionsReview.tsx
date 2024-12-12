import { useTransactionsReviewQuery } from "@/app/client.gen";
import { toDateIso } from "@/Utils/date-iso";
import {
  formatCurrency,
  formatDate,
  getNamedDateRange,
} from "@/Utils/formatters";
import {
  getRelativePosition,
  useRelativeSize,
  useRouteParams,
} from "@/Utils/helpers";
import { generateColor } from "@marko19907/string-to-color";
import _ from "lodash";
import React from "react";
import { Empty } from "../Atoms/Empty";
import { Monospace } from "../Atoms/Monospace";
import { NavigationChevron } from "../Atoms/NavigationChevron";
import { Spinner } from "../Atoms/Spinner";
import { Subheadline } from "../Atoms/Subheadline";
import { Title1 } from "../Atoms/Title1";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { NavigationBar } from "../Molecules/NavigationBar";
import { SectionHeading } from "../Molecules/SectionHeading";
import { ContentScrollable } from "../Templates/Content";
import styles from "./TransactionReview.module.css";

export const TransactionsReview = () => {
  const size = useRelativeSize("single");
  const params = useRouteParams<{
    entityId: string;
    start: string;
    end: string;
  }>();
  // const navigate = useNavigate();

  const results = useTransactionsReviewQuery({
    variables: {
      dateRange: {
        start: params.start,
        end: params.end,
      },
    },
  });

  const onBackClicked = React.useCallback(() => {
    // TODO
    // navigate(-1);
  }, []);

  const vendors = React.useMemo(() => {
    return _.orderBy(results.data?.vendors || [], (v) => v.name.toLowerCase());
  }, [results]);

  const categories = React.useMemo(() => {
    return _.orderBy(results.data?.categories || [], (v) =>
      v.name.toLowerCase(),
    );
  }, [results]);

  const transactions = React.useMemo(() => {
    return _.orderBy(
      results.data?.transactions || [],
      [
        (t) =>
          t.description
            .toUpperCase()
            .replace(/^[0-9 ]+/, "")
            .replace(/[AEIOUYaeiouy]/g, ""),
        (t) => Math.abs(t.amount),
      ],
      ["asc", "desc"],
    );
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
      <ContentScrollable type="wrap-cards" fullWidth>
        <Title1 title="Transaction Review" />
        <SectionHeading
          title={getNamedDateRange({
            start: toDateIso(params.start),
            end: toDateIso(params.end),
          })}
        />

        <div
          style={{ width: `${size}px` }}
          className={styles.transactionReviewContainer}
        >
          {/* TODO memoize */}
          {transactions.map((transaction, index) => {
            return (
              <Card size="double" key={transaction.id}>
                <CardContents
                  position={getRelativePosition(
                    index,
                    results.data?.transactions || [],
                  )}
                >
                  <div className={styles.transactionReviewCard}>
                    <div className={styles.transactionReviewCardImage}>
                      {transaction.vendor?.image && (
                        <img
                          alt={transaction.vendor?.name || ""}
                          className={styles.transactionReviewCardImage}
                          src={`data:image/png;base64,${transaction.vendor?.image}`}
                        />
                      )}
                      {!transaction.vendor?.image && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 90 90"
                        >
                          <g id="Group_81" data-name="Group 81">
                            <rect
                              id="Rectangle_251"
                              data-name="Rectangle 251"
                              width="90"
                              height="90"
                              rx="10"
                              fill={generateColor(
                                transaction.vendor?.name || "",
                              )}
                            />
                            <text
                              id="W"
                              x="50%"
                              y="50%"
                              text-anchor="middle"
                              fill="#f5f5f5"
                              font-size="62"
                              font-family='"SF Pro Text", "SF Pro Display", -apple-system, system-ui,
BlinkMacSystemFont;'
                              font-weight="500"
                            >
                              <tspan y="69">
                                {transaction.vendor?.name
                                  .substring(0, 1)
                                  .toUpperCase()}
                              </tspan>
                            </text>
                          </g>
                        </svg>
                      )}
                    </div>

                    <div className={styles.transactionReviewCardDate}>
                      {formatDate(transaction.date)}
                    </div>

                    <div className={styles.transactionReviewCardEntityName}>
                      <Subheadline title={transaction.account.entity.name} />
                    </div>

                    <div className={styles.transactionReviewCardAccountName}>
                      <Subheadline title={transaction.account.name} />
                    </div>

                    <div className={styles.transactionReviewCardAccountNumber}>
                      <Subheadline title={transaction.account.number} />
                    </div>

                    <div className={styles.transactionReviewCardDescription}>
                      <Monospace title={transaction.description} />
                    </div>

                    <div className={styles.transactionReviewCardAmount}>
                      {formatCurrency.format(transaction.amount)}
                    </div>

                    {/* <div>{transaction.pending}</div> */}
                    <div>
                      <select className={styles.vendors}>
                        {vendors.map((vendor) => {
                          return (
                            <option
                              key={vendor.id}
                              id={vendor.id}
                              selected={transaction.vendor?.id === vendor.id}
                            >
                              {vendor.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <select className={styles.categories}>
                        {categories.map((category) => {
                          return (
                            <option
                              key={category.id}
                              id={category.id}
                              selected={
                                transaction.category?.categoryId ===
                                category.categoryId
                              }
                            >
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </CardContents>
              </Card>
            );
          })}
        </div>
      </ContentScrollable>
    </Empty>
  );
};
