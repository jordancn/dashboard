import { Caption1 } from "@/Atoms/Caption1";
import { CategoryType, DateRange } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { ChangeIndicator } from "@/Molecules/ChangeIndicator";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import styles from "./InsightCard.module.css";

export const InsightCard = ({
  entityId,
  categoryId,
  categoryName,
  categoryType,
  changePercent,
  currentTotal,
  previousTotal,
  dateRange,
}: {
  entityId?: string;
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  changePercent: number | null | undefined;
  currentTotal: number;
  previousTotal: number;
  dateRange: DateRange;
}) => {
  const change = currentTotal - previousTotal;

  return (
    <Card
      size="half"
      href={`/entity/${entityId}/insights/category/${categoryId}/${dateRange.start}/${dateRange.end}`}
    >
      <CardContents>
        <Caption1 title={categoryName} />

        <div className={styles.changeContainer}>
          <ChangeIndicator change={change} categoryType={categoryType} />
          <TransactionAmount
            value={changePercent}
            formatter={(value) =>
              formatNumber.formatPercentInt(value, { withSign: false })
            }
            size="small"
          />
        </div>

        <div className={styles.balanceContainer}>
          <div>
            <Caption1
              title={formatCurrency.format(previousTotal)}
              ordinal="Secondary"
            />
          </div>
          <div>
            <Caption1
              title={`${change > 0 ? "+" : ""}${formatCurrency.format(change)}`}
              ordinal="Secondary"
            />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
