import { useSetTransactionCategoryMutation } from "@/app/client.gen";
import { useCallback } from "react";
import { Checkmark } from "../Atoms/Checkmark";
import { Headline } from "../Atoms/Headline";
import { Card } from "../Molecules/Card";
import { CardContents } from "../Molecules/CardContents";
import styles from "./TransactionCategoryCard.module.css";

export const TransactionCategoryCard = (props: {
  isChecked: boolean;
  position?: "start" | "middle" | "end";
  transaction: { id: string };
  category?: { id: string; name: string; categoryId: string };
}) => {
  // const navigate = useNavigate();

  // , { data, loading, error }
  const [setTransactionCategoryMutation] = useSetTransactionCategoryMutation({
    variables: {
      transactionId: props.transaction.id,
      categoryId: props.category?.categoryId,
    },
  });

  const onClick = useCallback(async () => {
    await setTransactionCategoryMutation();

    // TODO
    // navigate(-1);
  }, [setTransactionCategoryMutation]);

  return (
    <Card size="single" onClick={onClick}>
      <CardContents position={props.position}>
        <div className={styles.transactionCategoryCard}>
          <div className={styles.transactionCategoryCardHeadlineContainer}>
            <div>
              <Headline title={props.category?.name || "No Category"} />
            </div>
          </div>
          <div className={styles.transactionCategoryCardRight}>
            {props.isChecked && <Checkmark />}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
