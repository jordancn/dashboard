import { TransactionCards } from "@/Organisms/TransactionCards";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionCards> = {
  title: "Organisms/TransactionCards",
  component: TransactionCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransactionCards>;

export const Default: Story = {
  args: {
    transactions: [
      {
        id: "1",
        date: toDateIso("2023-01-01"),
        vendorName: "Grocery Store",
        categoryName: "Groceries",
        amount: 50.25,
        pending: false,
      },
      {
        id: "2",
        date: toDateIso("2023-01-02"),
        vendorName: "Gas Station",
        categoryName: "Transportation",
        amount: 35.0,
        pending: false,
      },
      {
        id: "3",
        date: toDateIso("2023-01-03"),
        vendorName: "Restaurant",
        categoryName: "Dining",
        amount: 75.5,
        pending: true,
      },
    ],
    entityId: "personal",
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
    entityId: "personal",
  },
};

export const SingleTransaction: Story = {
  args: {
    transactions: [
      {
        id: "1",
        date: toDateIso("2023-01-01"),
        vendorName: "Grocery Store",
        categoryName: "Groceries",
        amount: 50.25,
        pending: false,
      },
    ],
    entityId: "personal",
  },
};
