import {
  useAddCategoryMutation,
  useSetTransactionCategoryMutation,
} from "@/app/client.gen";
import { useCallback } from "react";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import { TextInput } from "../Molecules/TextInput";
import styles from "./TransactionNewCategoryCard.module.css";
export const TransactionNewCategoryCard = (props: {
  placeholder: string;
  position?: "start" | "middle" | "end";
  transaction: { id: string };
}) => {
  // const navigate = useNavigate();

  const [setTransactionCategoryMutation] = useSetTransactionCategoryMutation();

  const [addCategory] = useAddCategoryMutation();

  const onChange = useCallback(
    async (name: string) => {
      const category = await addCategory({
        variables: {
          name,
        },
        refetchQueries: ["TransactionCategory"],
      });

      if (!category.data?.addCategory.categoryId) {
        return;
      }

      await setTransactionCategoryMutation({
        variables: {
          transactionId: props.transaction.id,
          categoryId: category.data.addCategory.categoryId,
        },
      });

      // TODO
      // navigate(-1);
    },
    [setTransactionCategoryMutation, props.transaction.id],
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
