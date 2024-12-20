import { ExpenseDownIndicator } from "@/Atoms/ExpenseDownIndicator";
import { ExpenseUpIndicator } from "@/Atoms/ExpenseUpIndicator";
import { IncomeDownIndicator } from "@/Atoms/IncomeDownIndicator";
import { IncomeUpIndicator } from "@/Atoms/IncomeUpIndicator";
import { NoChangeIndicator } from "@/Atoms/NoChangeIndicator";
import { CategoryType } from "@/GraphQL/client.gen";

export const ChangeIndicator = (props: {
  change: number | null | undefined;
  categoryType: CategoryType;
  size?: "small" | "medium";
  desaturated?: boolean;
}) => {
  if (
    props.change === null ||
    props.change === undefined ||
    props.change === 0
  ) {
    return (
      <NoChangeIndicator size={props.size} desaturated={props.desaturated} />
    );
  }

  if (props.categoryType === CategoryType.Expense) {
    if (props.change > 0) {
      return (
        <ExpenseUpIndicator size={props.size} desaturated={props.desaturated} />
      );
    }

    if (props.change < 0) {
      return (
        <ExpenseDownIndicator
          size={props.size}
          desaturated={props.desaturated}
        />
      );
    }
  }

  if (props.change > 0) {
    return (
      <IncomeUpIndicator size={props.size} desaturated={props.desaturated} />
    );
  }

  if (props.change < 0) {
    return (
      <IncomeDownIndicator size={props.size} desaturated={props.desaturated} />
    );
  }

  return null;
};
