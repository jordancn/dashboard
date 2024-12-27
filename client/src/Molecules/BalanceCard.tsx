import { Caption1 } from "@/Atoms/Caption1";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";

export const BalanceCard = ({
  size,
  label,
  balance,
  date,
  href,
}: {
  size?: "half" | "full" | "quarter";
  label?: string;
  balance: number;
  date?: DateIso;
  href?: string;
}) => {
  return (
    <Card size={size || "half"} href={href}>
      <CardContents>
        <Caption1 title={label || "Balance"} />
        <TransactionAmount
          size="small"
          value={balance}
          formatter={formatCurrency.formatK}
        />
        {date && <Caption1 title={formatDate(date)} ordinal="Secondary" />}
      </CardContents>
    </Card>
  );
};
