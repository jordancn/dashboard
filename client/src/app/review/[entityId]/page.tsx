"use client";
import { Table, TableProvider } from "@/app/review/[entityId]/Table";
import { Spinner } from "@/Atoms/Spinner";
import { useTransactionsReviewQuery } from "@/GraphQL/client.gen";
import { toDateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { useMemo } from "react";
import styles from "./page.module.css";

// make a provider that holds the data for the table
// make a hook that returns the data for the table

const TransactionsTable = () => {
  const start = toDateIso("2021-10-01");
  const end = toDateIso("2021-10-31");

  const results = useTransactionsReviewQuery({
    variables: {
      dateRange: {
        start,
        end,
      },
    },
  });

  const data = useMemo(() => {
    if (results.loading) {
      return [];
    }

    if (!results.data) {
      return [];
    }

    return results.data.transactions.map((transaction) => {
      return [
        `${transaction.date}`,
        `${transaction.description}`,
        `${transaction.amount}`,
        `${transaction.pending}`,
      ];
    });
  }, [results]);

  const renderFns = useMemo(() => {
    return [
      (date: string) => `${formatDate(toDateIso(date))}`,
      (description: string) => (
        <div className={styles.description}>{description}</div>
      ),
      (amount: string) => (
        <div className={styles.currency}>
          {formatCurrency.format(Number.parseFloat(amount))}
        </div>
      ),
      (pending: string) => `${pending}`,
    ];
  }, []);

  if (results.loading) {
    return <Spinner />;
  }

  return (
    <TableProvider data={data} renderFns={renderFns}>
      <Table />
    </TableProvider>
  );
};

const TransactionsReview = () => {
  // const params = useRouteParams(assertIsEntityParams);

  return (
    <div>
      Review
      <TransactionsTable />
    </div>
  );
};

// const TransactionsReview = () => {
//   const size = useSize("single");
//   const params = useRouteParams(assertIsEntityParams);

//   // const navigate = useNavigate();

//   const start = toDateIso("2022-02-01");
//   const end = toDateIso("2022-02-28");

//   const results = useTransactionsReviewQuery({
//     variables: {
//       dateRange: {
//         start,
//         end,
//       },
//     },
//   });

//   const onBackClicked = React.useCallback(() => {
//     // TODO
//     // navigate(-1);
//   }, []);

//   const vendors = React.useMemo(() => {
//     return _.orderBy(results.data?.vendors || [], (v) => v.name.toLowerCase());
//   }, [results]);

//   const categories = React.useMemo(() => {
//     return _.orderBy(results.data?.categories || [], (v) =>
//       v.name.toLowerCase(),
//     );
//   }, [results]);

//   const transactions = React.useMemo(() => {
//     return _.orderBy(
//       results.data?.transactions || [],
//       [
//         (t) =>
//           t.description
//             .toUpperCase()
//             .replace(/^[0-9 ]+/, "")
//             .replace(/[AEIOUYaeiouy]/g, ""),
//         (t) => Math.abs(t.amount),
//       ],
//       ["asc", "desc"],
//     );
//   }, [results]);

//   if (results.loading) {
//     return (
//       <>
//         <NavigationBar></NavigationBar>
//         <ContentScrollable type="wrap-cards">
//           <Spinner />
//         </ContentScrollable>
//       </>
//     );
//   }

//   return (
//     <>
//       <NavigationBar>
//         <div className={styles.navigationBar}>
//           <div className={styles.backButtonContainer} onClick={onBackClicked}>
//             <div>
//               <NavigationChevron />
//             </div>
//             <div className={styles.title}>Insights</div>
//           </div>
//         </div>
//       </NavigationBar>
//       <ContentScrollable type="wrap-cards" fullWidth>
//         <Title1 title="Transaction Review" />
//         <SectionHeading
//           title={getNamedDateRange({
//             start,
//             end,
//           })}
//         />

//         <div
//           className={classNames(styles.transactionReviewContainer, {
//             ...getWidthClassName(size),
//           })}
//         >
//           {/* TODO memoize */}
//           {transactions.map((transaction, index) => {
//             return (
//               <Card size="double" key={transaction.id}>
//                 <CardContents
//                   position={getRelativePosition(
//                     index,
//                     results.data?.transactions || [],
//                   )}
//                 >
//                   <div className={styles.transactionReviewCard}>
//                     <div className={styles.transactionReviewCardImage}>
//                       {transaction.vendor?.image && (
//                         <img
//                           alt={transaction.vendor?.name || ""}
//                           className={styles.transactionReviewCardImage}
//                           src={`data:image/png;base64,${transaction.vendor?.image}`}
//                         />
//                       )}
//                       {!transaction.vendor?.image && (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="45"
//                           height="45"
//                           viewBox="0 0 90 90"
//                         >
//                           <g id="Group_81" data-name="Group 81">
//                             <rect
//                               id="Rectangle_251"
//                               data-name="Rectangle 251"
//                               width="90"
//                               height="90"
//                               rx="10"
//                               fill={generateColor(
//                                 transaction.vendor?.name || "",
//                               )}
//                             />
//                             <text
//                               id="W"
//                               x="50%"
//                               y="50%"
//                               text-anchor="middle"
//                               fill="#f5f5f5"
//                               font-size="62"
//                               font-family='"SF Pro Text", "SF Pro Display", -apple-system, system-ui,
// BlinkMacSystemFont;'
//                               font-weight="500"
//                             >
//                               <tspan y="69">
//                                 {transaction.vendor?.name
//                                   .substring(0, 1)
//                                   .toUpperCase()}
//                               </tspan>
//                             </text>
//                           </g>
//                         </svg>
//                       )}
//                     </div>

//                     <div className={styles.transactionReviewCardDate}>
//                       {formatDate(transaction.date)}
//                     </div>

//                     <div className={styles.transactionReviewCardEntityName}>
//                       <Subheadline title={transaction.account.entity.name} />
//                     </div>

//                     <div className={styles.transactionReviewCardAccountName}>
//                       <Subheadline title={transaction.account.name} />
//                     </div>

//                     <div className={styles.transactionReviewCardAccountNumber}>
//                       <Subheadline title={transaction.account.number} />
//                     </div>

//                     <div className={styles.transactionReviewCardDescription}>
//                       <Monospace title={transaction.description} />
//                     </div>

//                     <div className={styles.transactionReviewCardAmount}>
//                       {formatCurrency.format(transaction.amount)}
//                     </div>

//                     {/* <div>{transaction.pending}</div> */}
//                     <div>
//                       <select className={styles.vendors}>
//                         {vendors.map((vendor) => {
//                           return (
//                             <option
//                               key={vendor.id}
//                               id={vendor.id}
//                               selected={transaction.vendor?.id === vendor.id}
//                             >
//                               {vendor.name}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>
//                     <div>
//                       <select className={styles.categories}>
//                         {categories.map((category) => {
//                           return (
//                             <option
//                               key={category.id}
//                               id={category.id}
//                               selected={
//                                 transaction.category?.categoryId ===
//                                 category.categoryId
//                               }
//                             >
//                               {category.name}
//                             </option>
//                           );
//                         })}
//                       </select>
//                     </div>
//                   </div>
//                 </CardContents>
//               </Card>
//             );
//           })}
//         </div>
//       </ContentScrollable>
//     </>
//   );
// };

export default TransactionsReview;
