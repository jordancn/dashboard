import { Caption1 } from "@/Atoms/Caption1";
import { Title3 } from "@/Atoms/Title3";
import { Card } from "@/Molecules/Card";
import { CardContents } from "@/Molecules/CardContents";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";

export const EntityInsightBalanceCard = (props: {
  size?: "half" | "single" | "double" | "triple" | "quadruple";
  label?: string;
  balance: number;
  date?: DateIso;
  href?: string;
}) => {
  return (
    <Card size={props.size || "half"} href={props.href}>
      <CardContents>
        <Caption1 title={props.label || "Balance"} />
        <Title3 title={formatCurrency.formatK(props.balance)} />
        {props.date && (
          <Caption1 title={formatDate(props.date)} ordinal="Secondary" />
        )}
      </CardContents>
    </Card>
  );
};
