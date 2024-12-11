import { DateRange } from "@/app/client.gen";
import { Card } from "@/Components/Molecules/Card";
import { CardContents } from "@/Components/Molecules/CardContents";
import { CardTitle } from "@/Components/Molecules/CardTitle";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import { Subheadline } from "../Atoms/Subheadline";
import { Caption1 } from "../Atoms/Caption1";
import styles from "./BudgetCard.module.css";
import { Title2 } from "../Atoms/Title2";
import { useCallback } from "react";

export const BudgetCard = (props: {
  entityId?: string;
  categoryId: string;
  categoryName: string;
  budget: number | null | undefined;
  amount: number;
  percent: number;
  dateRange: DateRange;
}) => {
  const onClick = useCallback(() => {
    // TODO: Implement
    // navigate(
    //   `/entity/${props.entityId}/insights/category/${props.categoryId}/${props.dateRange.start}/${props.dateRange.end}`,
    // );
  }, []);

  return (
    <Card size="half" onClick={onClick}>
      <CardTitle />
      <CardContents>
        <Subheadline title={props.categoryName} />
        <div className={styles.titleContainer}>
          <Title2 title={formatNumber.formatPercentInt(props.percent)} />

          <div>
            {props.percent < 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <circle
                  id="Ellipse_25"
                  data-name="Ellipse 25"
                  cx="15"
                  cy="15"
                  r="15"
                  fill="#1ed555"
                />
              </svg>
            )}
            {props.percent >= 1 && props.percent < 1.25 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <circle
                  id="Ellipse_27"
                  data-name="Ellipse 27"
                  cx="15"
                  cy="15"
                  r="15"
                  fill="#ede73c"
                />
              </svg>
            )}
            {props.percent > 1.25 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
              >
                <circle
                  id="Ellipse_29"
                  data-name="Ellipse 29"
                  cx="15"
                  cy="15"
                  r="15"
                  fill="#ff3b30"
                />
              </svg>
            )}
          </div>
        </div>

        <div className={styles.secondaryContainer}>
          <div>
            <Caption1
              title={formatCurrency.format(props.amount)}
              color="Secondary"
            />
          </div>
          <div>
            <Caption1
              title={formatCurrency.format(props.budget || 0)}
              color="Secondary"
            />
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
