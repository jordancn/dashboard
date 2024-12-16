"use client";

import { useRouteParams } from "@/Utils/helpers";
import { assertIsTransactionParams } from "@/Utils/param-helpers";

const TransactionPage = () => {
  const params = useRouteParams(assertIsTransactionParams);

  console.log("params", params);

  return <div>TransactionPage {params.transactionId}</div>;
};

export default TransactionPage;
