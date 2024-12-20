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

export const TransactionGroupCard = (props: {
  id: string;
  title: string | undefined;
  transactionCount: number;
  total: number;
  relativePosition: "start" | "middle" | "end" | "single";
  href?: string;
  changePercent?: number | null;
  categoryType?: CategoryType;
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
            <div>
              <Caption1
                title={`${props.transactionCount} transactions`}
                ordinal="Secondary"
              />
            </div>
          </div>
          <div className={styles.amountContainer}>
            <div className={styles.amount}>
              {props.categoryType && (
                <div>
                  {formatCurrency.format(props.total, { withSign: false })}
                </div>
              )}
              {!props.categoryType && (
                <div>{formatCurrency.format(props.total)}</div>
              )}
            </div>
            <div className={styles.change}>
              {props.categoryType && (
                <>
                  <ChangeIndicator
                    change={props.changePercent}
                    categoryType={props.categoryType}
                    desaturated
                    size="small"
                  />
                  <div className={styles.changeValue}>
                    <Caption1
                      title={`${formatNumber.formatPercentInt(props.changePercent ?? 0, { withSign: false })}`}
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
