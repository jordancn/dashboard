import { BudgetCard } from "@/Molecules/BudgetCard";
import { toIsoDate } from "@/Utils/date-iso";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BudgetCard> = {
  title: "Molecules/BudgetCard",
  component: BudgetCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BudgetCard>;

export const UnderBudget: Story = {
  args: {
    entityId: "1",
    categoryId: "1",
    categoryName: "Groceries",
    budget: 1000,
    amount: 750,
    percent: 0.75,
    dateRange: {
      start: toIsoDate("2024-01-01"),
      end: toIsoDate("2024-01-31"),
    },
  },
};

export const AtBudget: Story = {
  args: {
    entityId: "1",
    categoryId: "1",
    categoryName: "Dining Out",
    budget: 500,
    amount: 500,
    percent: 1,
    dateRange: {
      start: toIsoDate("2024-01-01"),
      end: toIsoDate("2024-01-31"),
    },
  },
};

export const OverBudget: Story = {
  args: {
    entityId: "1",
    categoryId: "1",
    categoryName: "Shopping",
    budget: 200,
    amount: 300,
    percent: 1.5,
    dateRange: {
      start: toIsoDate("2024-01-01"),
      end: toIsoDate("2024-01-31"),
    },
  },
};
