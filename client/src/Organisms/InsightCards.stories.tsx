import { CategoryType } from "@/GraphQL/client.gen";
import { InsightCards } from "@/Organisms/InsightCards";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InsightCards> = {
  title: "Organisms/InsightCards",
  component: InsightCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InsightCards>;

export const Default: Story = {
  args: {
    entityId: "entity1",
    insights: [
      {
        id: "1",
        categoryId: "cat1",
        categoryName: "Groceries",
        categoryType: CategoryType.Expense,
        changePercent: 25,
        currentTotal: 750,
        previousTotal: 600,
      },
      {
        id: "2",
        categoryId: "cat2",
        categoryName: "Entertainment",
        categoryType: CategoryType.Expense,
        changePercent: -15,
        currentTotal: 300,
        previousTotal: 350,
      },
      {
        id: "3",
        categoryId: "cat3",
        categoryName: "Salary",
        categoryType: CategoryType.Income,
        changePercent: 5,
        currentTotal: 5000,
        previousTotal: 4750,
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
    insights: [],
    dateRange: {
      start: toDateIso("2024-01-01"),
      end: toDateIso("2024-01-31"),
    },
  },
};
