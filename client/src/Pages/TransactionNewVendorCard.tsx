import {
  useAddVendorMutation,
  useSetTransactionVendorMutation,
} from "@/app/client.gen";
import { useCallback } from "react";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { TextInput } from "../Molecules/TextInput";
import styles from "./TransactionNewVendorCard.module.css";

export const TransactionNewVendorCard = (props: {
  placeholder: string;
  position?: "start" | "middle" | "end";
  transaction: { id: string };
}) => {
  // const navigate = useNavigate();

  const [setTransactionVendorMutation] = useSetTransactionVendorMutation();

  const [addVendor] = useAddVendorMutation();

  const onChange = useCallback(
    async (name: string) => {
      const vendor = await addVendor({
        variables: {
          name,
        },
        refetchQueries: ["TransactionVendor"],
      });

      if (!vendor.data?.addVendor.id) {
        return;
      }

      await setTransactionVendorMutation({
        variables: {
          transactionId: props.transaction.id,
          vendorId: vendor.data.addVendor.id,
        },
      });

      // TODO
      // navigate(-1);
    },
    [setTransactionVendorMutation, props.transaction.id],
  );

  return (
    <Card size="single">
      <CardContents position={props.position}>
        <div className={styles.cardContent}>
          <div className={styles.inputContainer}>
            <TextInput
              placeholder={props.placeholder}
              value=""
              onChange={onChange}
            />
          </div>
          <div className={styles.tbdContainer}></div>
        </div>
      </CardContents>
    </Card>
  );
};
