import { ExpenseDownIndicator } from "@/Atoms/ExpenseDownIndicator";
import { ExpenseUpIndicator } from "@/Atoms/ExpenseUpIndicator";
import { IncomeDownIndicator } from "@/Atoms/IncomeDownIndicator";
import { IncomeUpIndicator } from "@/Atoms/IncomeUpIndicator";
import { CategoryType } from "@/GraphQL/client.gen";

export const ChangeIndicator = (props: {
  change: number;
  categoryType: CategoryType;
}) => {
  if ((props.change || 0) > 0 && props.categoryType === CategoryType.Expense) {
    return <ExpenseUpIndicator />;
  }
  if ((props.change || 0) > 0 && props.categoryType === CategoryType.Income) {
    return <IncomeUpIndicator />;
  }

  if ((props.change || 0) < 0 && props.categoryType === CategoryType.Expense) {
    return <ExpenseDownIndicator />;
  }

  if ((props.change || 0) < 0 && props.categoryType === CategoryType.Income) {
    return <IncomeDownIndicator />;
  }

  return null;
};
