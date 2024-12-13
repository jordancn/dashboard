import { BudgetCards } from "@/Organisms/BudgetCards";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BudgetCards> = {
  title: "Organisms/BudgetCards",
  component: BudgetCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BudgetCards>;

export const Default: Story = {
  args: {
    entityId: "entity1",
    budget: [
      {
        id: "1",
        categoryId: "cat1",
        categoryName: "Groceries",
        budget: 1000,
        amount: 750,
        percent: 75,
      },
      {
        id: "2",
        categoryId: "cat2",
        categoryName: "Entertainment",
        budget: 500,
        amount: 300,
        percent: 60,
      },
      {
        id: "3",
        categoryId: "cat3",
        categoryName: "Transportation",
        budget: 200,
        amount: 180,
        percent: 90,
      },
    ],
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};

export const Empty: Story = {
  args: {
    entityId: "entity1",
    budget: [],
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};
