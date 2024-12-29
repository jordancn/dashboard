"use client";

import { Checkmark } from "@/Atoms/Checkmark";
import { Subheadline } from "@/Atoms/Subheadline";
import { useSetTransactionCategoryMutation } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./TransactionCategoryCard.module.css";

export const TransactionCategoryCard = ({
  isChecked,
  position,
  transaction,
  category,
}: {
  isChecked: boolean;
  position?: "single" | "start" | "middle" | "end";
  transaction: { id: string };
  category?: { id: string; name: string; categoryId: string };
}) => {
  const router = useRouter();

  const [setTransactionCategoryMutation, { data, loading, error }] =
    useSetTransactionCategoryMutation({
      variables: {
        transactionId: transaction.id,
        categoryId: category?.categoryId,
      },
    });

  const onClick = useCallback(async () => {
    await setTransactionCategoryMutation();

    router.back();
  }, [setTransactionCategoryMutation]);

  return (
    <Card onClick={onClick} withSeparators>
      <CardContents position={position}>
        <div className={styles.root}>
          <div className={styles.title}>
            <div>
              <Subheadline title={category?.name || "No Category"} />
            </div>
          </div>
          <div className={styles.checked}>{isChecked && <Checkmark />}</div>
        </div>
      </CardContents>
    </Card>
  );
};
