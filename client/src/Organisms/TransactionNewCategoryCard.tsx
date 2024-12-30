import {
  CategoryType,
  useAddCategoryMutation,
  useSetTransactionCategoryMutation,
} from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { TextInput } from "@/Molecules/TextInput";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./TransactionNewCategoryCard.module.css";

export const TransactionNewCategoryCard = ({
  transaction,
  categoryType,
}: {
  transaction: { id: string };
  categoryType: CategoryType;
}) => {
  const router = useRouter();

  const [setTransactionCategoryMutation] = useSetTransactionCategoryMutation();

  const [addCategory] = useAddCategoryMutation();

  const onChange = useCallback(
    async (name: string) => {
      const category = await addCategory({
        variables: {
          name,
          categoryType,
        },
        refetchQueries: ["TransactionCategory", "Transaction"],
      });

      if (!category.data?.addCategory.categoryId) {
        return;
      }

      await setTransactionCategoryMutation({
        variables: {
          transactionId: transaction.id,
          categoryId: category.data.addCategory.categoryId,
        },
      });

      router.back();
    },
    [
      setTransactionCategoryMutation,
      transaction.id,
      addCategory,
      categoryType,
      router,
    ],
  );

  return (
    <Card withSeparators>
      <CardContents position="start">
        <div className={styles.card}>
          <div className={styles.text}>
            <TextInput
              placeholder="New Category"
              value=""
              onChange={onChange}
            />
          </div>
          <div className={styles.empty}></div>
        </div>
      </CardContents>
    </Card>
  );
};
