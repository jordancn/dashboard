import { CategoryType, DateRange } from "@/app/client.gen";
import { Card } from "@/Components/Molecules/Card";
import { CardContents } from "@/Components/Molecules/CardContents";
import { CardTitle } from "@/Components/Molecules/CardTitle";
import { addMonths, getFirstDayOfMonth } from "@/Utils/date-iso";
import { formatCurrency, formatNumber } from "@/Utils/formatters";
import * as React from "react";
import { Caption1 } from "../Atoms/Caption1";
import { Title3 } from "../Atoms/Title3";
import styles from "./InsightCard.module.css";

export const InsightCard = (props: {
  entityId?: string;
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  changePercent: number | null | undefined;
  currentTotal: number;
  previousTotal: number;
  dateRange: DateRange;
}) => {
  // const navigate = useNavigate();

  const change = props.currentTotal - props.previousTotal;

  const start = addMonths(getFirstDayOfMonth(props.dateRange.start), -1);

  const onClick = React.useCallback(() => {
    // TODO
    // navigate(
    //   `/entity/${props.entityId || "overview"}/insights/category/${props.categoryId}/${start}/${props.dateRange.end}`,
    // );
  }, []);

  const expenseUp = (
    <svg
      id="Layer_1"
      style={{
        width: "20px",
        height: "20px",
        marginLeft: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <defs></defs>
      <path
        style={{ fill: "#ff3b30" }}
        d="M6.12,19.14A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.32,10.32,0,0,1,2.93,2.94,10.18,10.18,0,0,1,6.11.78,9.55,9.55,0,0,1,10,0,9.64,9.64,0,0,1,13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84,10.24,10.24,0,0,1-5.34,5.34,9.55,9.55,0,0,1-3.84.78A9.55,9.55,0,0,1,6.12,19.14Zm4.4-4.36a.74.74,0,0,0,.21-.55v-5l-.08-2.15,1,1.22,1.18,1.2a.71.71,0,0,0,.54.23.74.74,0,0,0,.53-.21A.72.72,0,0,0,14.13,9a.75.75,0,0,0-.2-.52L10.57,5.12a.73.73,0,0,0-1.18,0L6,8.46A.69.69,0,0,0,5.83,9,.72.72,0,0,0,6,9.51a.7.7,0,0,0,.52.21.74.74,0,0,0,.54-.23l1.19-1.2,1-1.21L9.22,9.22v5a.74.74,0,0,0,.21.55A.77.77,0,0,0,10,15,.73.73,0,0,0,10.52,14.78Z"
      />
    </svg>
  );

  const incomeUp = (
    <svg
      id="Layer_1"
      style={{
        width: "20px",
        height: "20px",
        marginLeft: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <defs></defs>
      <path
        style={{ fill: "#34c759" }}
        d="M6.12,19.14A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.32,10.32,0,0,1,2.93,2.94,10.18,10.18,0,0,1,6.11.78,9.55,9.55,0,0,1,10,0,9.64,9.64,0,0,1,13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84,10.24,10.24,0,0,1-5.34,5.34,9.55,9.55,0,0,1-3.84.78A9.55,9.55,0,0,1,6.12,19.14Zm4.4-4.36a.74.74,0,0,0,.21-.55v-5l-.08-2.15,1,1.22,1.18,1.2a.71.71,0,0,0,.54.23.74.74,0,0,0,.53-.21A.72.72,0,0,0,14.13,9a.75.75,0,0,0-.2-.52L10.57,5.12a.73.73,0,0,0-1.18,0L6,8.46A.69.69,0,0,0,5.83,9,.72.72,0,0,0,6,9.51a.7.7,0,0,0,.52.21.74.74,0,0,0,.54-.23l1.19-1.2,1-1.21L9.22,9.22v5a.74.74,0,0,0,.21.55A.77.77,0,0,0,10,15,.73.73,0,0,0,10.52,14.78Z"
      />
    </svg>
  );

  const expenseDown = (
    <svg
      id="Layer_1"
      style={{
        width: "20px",
        height: "20px",
        marginLeft: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <defs></defs>
      <path
        style={{ fill: "#34c759" }}
        d="M13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84A10.32,10.32,0,0,1,17,17a10.18,10.18,0,0,1-3.18,2.16,9.55,9.55,0,0,1-3.84.78,9.64,9.64,0,0,1-3.85-.78A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.24,10.24,0,0,1,6.12.78,9.55,9.55,0,0,1,10,0,9.55,9.55,0,0,1,13.8.78ZM9.4,5.14a.75.75,0,0,0-.21.55v5l.08,2.15-1-1.22-1.18-1.2a.7.7,0,0,0-.54-.22.67.67,0,0,0-.52.21.67.67,0,0,0-.22.52.7.7,0,0,0,.21.52L9.35,14.8a.73.73,0,0,0,1.18,0l3.36-3.34a.72.72,0,0,0,.2-.52.7.7,0,0,0-.21-.52.67.67,0,0,0-.52-.21.73.73,0,0,0-.54.22l-1.19,1.2-1,1.21.08-2.14v-5a.75.75,0,0,0-.21-.55.77.77,0,0,0-.55-.21A.73.73,0,0,0,9.4,5.14Z"
      />
    </svg>
  );

  const incomeDown = (
    <svg
      id="Layer_1"
      style={{
        width: "20px",
        height: "20px",
        marginLeft: "5px",
        marginTop: "5px",
        marginBottom: "5px",
      }}
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.92 19.92"
    >
      <defs></defs>
      <path
        style={{ fill: "#ff3b30" }}
        d="M13.8.78a10.24,10.24,0,0,1,5.34,5.34A9.55,9.55,0,0,1,19.92,10a9.55,9.55,0,0,1-.78,3.84A10.32,10.32,0,0,1,17,17a10.18,10.18,0,0,1-3.18,2.16,9.55,9.55,0,0,1-3.84.78,9.64,9.64,0,0,1-3.85-.78A10.24,10.24,0,0,1,.78,13.8,9.55,9.55,0,0,1,0,10,9.55,9.55,0,0,1,.78,6.12,10.24,10.24,0,0,1,6.12.78,9.55,9.55,0,0,1,10,0,9.55,9.55,0,0,1,13.8.78ZM9.4,5.14a.75.75,0,0,0-.21.55v5l.08,2.15-1-1.22-1.18-1.2a.7.7,0,0,0-.54-.22.67.67,0,0,0-.52.21.67.67,0,0,0-.22.52.7.7,0,0,0,.21.52L9.35,14.8a.73.73,0,0,0,1.18,0l3.36-3.34a.72.72,0,0,0,.2-.52.7.7,0,0,0-.21-.52.67.67,0,0,0-.52-.21.73.73,0,0,0-.54.22l-1.19,1.2-1,1.21.08-2.14v-5a.75.75,0,0,0-.21-.55.77.77,0,0,0-.55-.21A.73.73,0,0,0,9.4,5.14Z"
      />
    </svg>
  );

  return (
    <Card size="half" onClick={onClick}>
      <CardTitle />
      <CardContents>
        <Caption1 title={props.categoryName} />
        <div className={styles.cardContents}>
          {/* <Title1 title={props.changePercent ? formatNumber.formatPercentInt(Math.abs(props.changePercent)) : '-'} /> */}
          <Title3 title={formatCurrency.format(Math.abs(props.currentTotal))} />

          {/* {(props.changePercent || 0) > 0 && props.categoryType === CategoryType.Expense && expenseUp}
          {(props.changePercent || 0) > 0 && props.categoryType === CategoryType.Income && incomeUp}

          {(props.changePercent || 0) < 0 && props.categoryType === CategoryType.Expense && expenseDown}
          {(props.changePercent || 0) < 0 && props.categoryType === CategoryType.Income && incomeDown} */}

          {(change || 0) > 0 &&
            props.categoryType === CategoryType.Expense &&
            expenseUp}
          {(change || 0) > 0 &&
            props.categoryType === CategoryType.Income &&
            incomeUp}

          {(change || 0) < 0 &&
            props.categoryType === CategoryType.Expense &&
            expenseDown}
          {(change || 0) < 0 &&
            props.categoryType === CategoryType.Income &&
            incomeDown}
        </div>

        <div className={styles.secondary}>
          <div>
            <Caption1
              title={formatCurrency.format(props.previousTotal)}
              color="Secondary"
            />
          </div>
          <div>
            <Caption1
              title={`${(props.changePercent || 0) > 0 ? "+" : ""}${props.changePercent ? formatNumber.formatPercentInt(props.changePercent) : ""}`}
              color="Secondary"
            />
            {/* <Subheadline title={`${change > 0 ? '+' : ''}${formatCurrency.format(change)}`} variant='secondary' /> */}
          </div>
        </div>
      </CardContents>
    </Card>
  );
};
