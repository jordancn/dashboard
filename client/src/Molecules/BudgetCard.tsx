import { Caption1 } from "@/Atoms/Caption1";
import { DateRange } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { TargetIndicator } from "@/Molecules/TargetIndicator";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import styles from "./BudgetCard.module.css";

export const BudgetCard = (props: {
  entityId?: string;
  categoryId: string;
  categoryName: string;
  budget: number | null | undefined;
  amount: number;
  percent: number;
  dateRange: DateRange;
}) => {
  return (
    <Card
      size="half"
      href={`/entity/${props.entityId}/insights/category/${props.categoryId}/${props.dateRange.start}/${props.dateRange.end}`}
    >
      <CardTitle />
      <CardContents>
        <Caption1 title={props.categoryName} />
        <div className={styles.changeContainer}>
          <TargetIndicator percent={props.percent} />

          <TransactionAmount
            value={props.percent}
            formatter={formatNumber.formatPercentInt}
            size="small"
          />
        </div>

        <div className={styles.balanceContainer}>
          <div>
            <Caption1
              title={formatCurrency.format(props.amount)}
              ordinal="Secondary"
            />
          </div>
          <div>
            <Caption1
              title={formatCurrency.format(props.budget || 0)}
              ordinal="Secondary"
            />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
