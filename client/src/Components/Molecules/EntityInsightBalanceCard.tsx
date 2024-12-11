import { Card } from "@/Components/Molecules/Card";
import { CardContents } from "@/Components/Molecules/CardContents";
import { DateIso } from "@/Utils/date-iso";
import { formatCurrency, formatDate } from "@/Utils/formatters";
import { Caption1 } from "../Atoms/Caption1";
import { Title3 } from "../Atoms/Title3";

export const EntityInsightBalanceCard = (props: {
  size?: "half" | "single" | "double" | "triple" | "quadruple";
  label?: string;
  balance: number;
  date?: DateIso;
  onClick?: () => void;
}) => {
  return (
    <Card size={props.size || "half"} onClick={props.onClick}>
      <CardContents>
        <Caption1 title={props.label || "Balance"} />
        <Title3 title={formatCurrency.formatK(props.balance)} />
        {props.date && (
          <Caption1 title={formatDate(props.date)} color="Secondary" />
        )}
      </CardContents>
    </Card>
  );
};
