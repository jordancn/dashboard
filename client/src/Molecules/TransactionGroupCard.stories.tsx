import { TransactionGroupCard } from "@/Molecules/TransactionGroupCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionGroupCard> = {
  title: "Molecules/TransactionGroupCard",
  component: TransactionGroupCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransactionGroupCard>;

export const Default: Story = {
  args: {
    title: "Food & Drink",
    transactionCount: 5,
    total: 123.45,
    relativePosition: "single",
  },
};

export const Start: Story = {
  args: {
    title: "Shopping",
    transactionCount: 3,
    total: 299.99,
    relativePosition: "start",
  },
};

export const Middle: Story = {
  args: {
    title: "Entertainment",
    transactionCount: 2,
    total: 89.97,
    relativePosition: "middle",
  },
};

export const End: Story = {
  args: {
    title: "Travel",
    transactionCount: 4,
    total: 1250.0,
    relativePosition: "end",
  },
};
