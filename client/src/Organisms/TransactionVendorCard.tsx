import { Checkmark } from "@/Atoms/Checkmark";
import { Subheadline } from "@/Atoms/Subheadline";
import { useSetTransactionVendorMutation } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./TransactionVendorCard.module.css";

export const TransactionVendorCard = ({
  isChecked,
  position,
  transaction,
  vendor,
}: {
  isChecked: boolean;
  position?: "single" | "start" | "middle" | "end";
  transaction: { id: string };
  vendor?: { id: string; name: string };
}) => {
  const router = useRouter();

  const [setTransactionVendorMutation, { data, loading, error }] =
    useSetTransactionVendorMutation({
      variables: {
        transactionId: transaction.id,
        vendorId: vendor?.id,
      },
    });

  const onClick = React.useCallback(async () => {
    await setTransactionVendorMutation();

    router.back();
  }, [setTransactionVendorMutation]);

  return (
    <Card onClick={onClick} withSeparators>
      <CardContents position={position}>
        <div className={styles.root}>
          <div className={styles.vendorNameContainer}>
            <div>
              <Subheadline title={vendor?.name || "No Vendor"} />
            </div>
          </div>
          <div className={styles.checkmarkContainer}>
            {isChecked && <Checkmark />}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
