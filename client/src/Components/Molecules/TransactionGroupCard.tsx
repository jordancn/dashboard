import { formatCurrency } from "@/Utils/formatters";
import { Caption1 } from "../Atoms/Caption1";
import { Chevron } from "../Atoms/Chevron";
import { Card } from "./Card";
import { CardContents } from "./CardContents";
import { CardTitle } from "./CardTitle";
import styles from "./TransactionGroupCard.module.css";

export const TransactionGroup = (props: {
  id: string;
  title: string | undefined;
  transactionCount: number;
  total: number;
  relativePosition: "start" | "middle" | "end" | "single";
  onClick?: () => void;
}) => {
  return (
    <Card size="single" onClick={props.onClick}>
      <CardTitle />
      <CardContents position={props.relativePosition}>
        <div className={styles.transactionGroupCard}>
          <div className={styles.titleContainer}>
            <div>
              <Caption1 weight="Bold" title={props.title || ""} />
            </div>
          </div>
          <div className={styles.amountContainer}>
            <div>{formatCurrency.format(props.total)}</div>
            <div>
              <Caption1
                title={`${props.transactionCount} transactions`}
                color="Secondary"
              />
            </div>
          </div>
          <div className={styles.chevronContainer}>
            <Chevron />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
