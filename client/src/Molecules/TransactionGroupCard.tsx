import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { Subheadline } from "@/Atoms/Subheadline";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { formatCurrency } from "@/Utils/formatters";
import styles from "./TransactionGroupCard.module.css";

export const TransactionGroupCard = (props: {
  id: string;
  title: string | undefined;
  transactionCount: number;
  total: number;
  relativePosition: "start" | "middle" | "end" | "single";
  href?: string;
}) => {
  return (
    <Card size="full" href={props.href}>
      <CardTitle />
      <CardContents position={props.relativePosition}>
        <div className={styles.transactionGroupCard}>
          <div className={styles.titleContainer}>
            <div>
              <Subheadline weight="Bold" title={props.title || ""} />
            </div>
          </div>
          <div className={styles.amountContainer}>
            <div>{formatCurrency.format(props.total)}</div>
            <div>
              <Caption1
                title={`${props.transactionCount} transactions`}
                ordinal="Secondary"
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
