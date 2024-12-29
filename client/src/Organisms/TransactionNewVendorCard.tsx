import {
  useAddVendorMutation,
  useSetTransactionVendorMutation,
} from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { TextInput } from "@/Molecules/TextInput";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import css from "./TransactionNewVendorCard.module.css";

export const TransactionNewVendorCard = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const router = useRouter();

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
          transactionId,
          vendorId: vendor.data.addVendor.id,
        },
      });

      router.back();
    },
    [setTransactionVendorMutation, transactionId],
  );

  return (
    <Card withSeparators>
      <CardContents position="start">
        <div className={css.card}>
          <div className={css.text}>
            <TextInput placeholder="New Vendor" value="" onChange={onChange} />
          </div>
          <div className={css.empty}></div>
        </div>
      </CardContents>
    </Card>
  );
};
