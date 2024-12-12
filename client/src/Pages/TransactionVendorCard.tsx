import { useSetTransactionVendorMutation } from "@/app/client.gen";
import { useCallback } from "react";
import { Checkmark } from "../Atoms/Checkmark";
import { Headline } from "../Atoms/Headline";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import styles from "./TransactionVendorCard.module.css";

export const TransactionVendorCard = (props: {
  isChecked: boolean;
  position?: "start" | "middle" | "end";
  transaction: { id: string };
  vendor?: { id: string; name: string };
}) => {
  // const navigate = useNavigate();

  // { data, loading, error }
  const [setTransactionVendorMutation] = useSetTransactionVendorMutation({
    variables: {
      transactionId: props.transaction.id,
      vendorId: props.vendor?.id,
    },
  });

  const onClick = useCallback(async () => {
    await setTransactionVendorMutation();

    // TODO
    // navigate(-1);
  }, [setTransactionVendorMutation]);

  return (
    <Card size="single" onClick={onClick}>
      <CardContents position={props.position}>
        <div className={styles.contents}>
          <div className={styles.vendorContainer}>
            <div>
              <Headline title={props.vendor?.name || "No Vendor"} />
            </div>
          </div>
          <div className={styles.checkedContainer}>
            {props.isChecked && <Checkmark />}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
