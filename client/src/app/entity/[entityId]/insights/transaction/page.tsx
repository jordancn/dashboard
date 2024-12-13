import { assertIsTransactionParams } from "@/Utils/param-helpers";
import { useRouteParams } from "@/Utils/helpers";

const TransactionPage = () => {
  const params = useRouteParams(assertIsTransactionParams);

  console.log("params", params);

  return <div>TransactionPage</div>;
};

export default TransactionPage;
