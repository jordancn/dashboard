import { Caption1 } from "@/Atoms/Caption1";
import { Chevron } from "@/Atoms/Chevron";
import { Subheadline } from "@/Atoms/Subheadline";
import { CategoryType } from "@/GraphQL/client.gen";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { CardTitle } from "@/Molecules/CardTitle";
import { ChangeIndicator } from "@/Molecules/ChangeIndicator";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import styles from "./TransactionGroupCard.module.css";

export const TransactionGroupCard = ({
  title,
  transactionCount,
  total,
  relativePosition,
  href,
  changePercent,
  categoryType,
}: {
  title: string | undefined;
  transactionCount: number;
  total: number;
  relativePosition: "start" | "middle" | "end" | "single";
  href?: string;
  changePercent?: number | null;
  categoryType?: CategoryType;
}) => {
  return (
    <Card href={href}>
      <CardTitle />
      <CardContents position={relativePosition}>
        <div className={styles.transactionGroupCard}>
          <div className={styles.titleContainer}>
            <div>
              <Subheadline weight="Bold" title={title || ""} />
            </div>
            <div>
              <Caption1
                title={`${transactionCount} transactions`}
                ordinal="Secondary"
              />
            </div>
          </div>
          <div className={styles.amountContainer}>
            <div className={styles.amount}>
              {categoryType && (
                <div>{formatCurrency.format(total, { withSign: false })}</div>
              )}
              {!categoryType && <div>{formatCurrency.format(total)}</div>}
            </div>
            <div className={styles.change}>
              {categoryType && (
                <>
                  <ChangeIndicator
                    change={changePercent}
                    categoryType={categoryType}
                    desaturated
                    size="small"
                  />
                  <div className={styles.changeValue}>
                    <Caption1
                      title={`${formatNumber.formatPercentInt(changePercent ?? 0, { withSign: false })}`}
                      ordinal="Secondary"
                    />
                  </div>
                </>
              )}
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
