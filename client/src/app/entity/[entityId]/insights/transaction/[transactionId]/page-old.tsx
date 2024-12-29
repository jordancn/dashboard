"use client";

import { hasTransactionId, useRouteParams } from "@/Utils/param-helpers";

const TransactionPage = () => {
  const params = useRouteParams({}, hasTransactionId);

  console.log("params", params);

  return <div>TransactionPage {params.transactionId}</div>;
};

export default TransactionPage;
