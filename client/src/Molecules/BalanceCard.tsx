import { Caption1 } from "@/Atoms/Caption1";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";

export const BalanceCard = (props: {
  size?: "half" | "full" | "quarter";
  label?: string;
  balance: number;
  date?: DateIso;
  href?: string;
}) => {
  return (
    <Card size={props.size || "half"} href={props.href}>
      <CardContents>
        <Caption1 title={props.label || "Balance"} />
        <TransactionAmount
          size="small"
          value={props.balance}
          formatter={formatCurrency.formatK}
        />
        {props.date && (
          <Caption1 title={formatDate(props.date)} ordinal="Secondary" />
        )}
      </CardContents>
    </Card>
  );
};
