import { CategoryType } from "@/GraphQL/client.gen";
import { InsightCard } from "@/Molecules/InsightCard";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InsightCard> = {
  title: "Molecules/InsightCard",
  component: InsightCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InsightCard>;

export const ExpenseIncrease: Story = {
  args: {
    entityId: "123",
    categoryId: "456",
    categoryName: "Groceries",
    categoryType: CategoryType.Expense,
    changePercent: 25,
    currentTotal: 1250,
    previousTotal: 1000,
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};

export const ExpenseDecrease: Story = {
  args: {
    entityId: "123",
    categoryId: "456",
    categoryName: "Dining Out",
    categoryType: CategoryType.Expense,
    changePercent: -15,
    currentTotal: 850,
    previousTotal: 1000,
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};

export const IncomeIncrease: Story = {
  args: {
    entityId: "123",
    categoryId: "789",
    categoryName: "Salary",
    categoryType: CategoryType.Income,
    changePercent: 10,
    currentTotal: 5500,
    previousTotal: 5000,
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};

export const IncomeDecrease: Story = {
  args: {
    entityId: "123",
    categoryId: "789",
    categoryName: "Investments",
    categoryType: CategoryType.Income,
    changePercent: -5,
    currentTotal: 950,
    previousTotal: 1000,
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};
