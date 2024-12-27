import { Caption1 } from "@/Atoms/Caption1";
import { DateRange } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { TargetIndicator } from "@/Molecules/TargetIndicator";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import styles from "./BudgetCard.module.css";

export const BudgetCard = ({
  size,
  entityId,
  categoryId,
  categoryName,
  budget,
  amount,
  percent,
  dateRange,
}: {
  size?: "half" | "full";
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
      href={`/entity/${entityId}/insights/category/${categoryId}/${dateRange.start}/${dateRange.end}`}
    >
      <CardTitle />
      <CardContents>
        <Caption1 title={categoryName} />
        <div className={styles.changeContainer}>
          <TargetIndicator percent={percent} />

          <TransactionAmount
            value={percent}
            formatter={formatNumber.formatPercentInt}
            size="small"
          />
        </div>

        <div className={styles.balanceContainer}>
          <div>
            <Caption1
              title={formatCurrency.format(amount)}
              ordinal="Secondary"
            />
          </div>
          <div>
            <Caption1
              title={formatCurrency.format(budget || 0)}
              ordinal="Secondary"
            />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
