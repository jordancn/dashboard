import { ExpenseDownIndicator } from "@/Atoms/ExpenseDownIndicator";
import { ExpenseUpIndicator } from "@/Atoms/ExpenseUpIndicator";
import { IncomeDownIndicator } from "@/Atoms/IncomeDownIndicator";
import { IncomeUpIndicator } from "@/Atoms/IncomeUpIndicator";
import { NoChangeIndicator } from "@/Atoms/NoChangeIndicator";
import { CategoryType } from "@/GraphQL/client.gen";

export const ChangeIndicator = ({
  change,
  categoryType,
  size,
  desaturated,
}: {
  change: number | null | undefined;
  categoryType: CategoryType;
  size?: "small" | "medium";
  desaturated?: boolean;
}) => {
  if (change === null || change === undefined || change === 0) {
    return <NoChangeIndicator size={size} desaturated={desaturated} />;
  }

  if (categoryType === CategoryType.Expense) {
    if (change > 0) {
      return <ExpenseUpIndicator size={size} desaturated={desaturated} />;
    }

    if (change < 0) {
      return <ExpenseDownIndicator size={size} desaturated={desaturated} />;
    }
  }

  if (change > 0) {
    return <IncomeUpIndicator size={size} desaturated={desaturated} />;
  }

  if (change < 0) {
    return <IncomeDownIndicator size={size} desaturated={desaturated} />;
  }

  return null;
};
