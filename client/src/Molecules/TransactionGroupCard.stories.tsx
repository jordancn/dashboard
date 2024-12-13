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
    id: "group_1",
    title: "Food & Drink",
    transactionCount: 5,
    total: 123.45,
    relativePosition: "single",
  },
};

export const Start: Story = {
  args: {
    id: "group_2",
    title: "Shopping",
    transactionCount: 3,
    total: 299.99,
    relativePosition: "start",
  },
};

export const Middle: Story = {
  args: {
    id: "group_3",
    title: "Entertainment",
    transactionCount: 2,
    total: 89.97,
    relativePosition: "middle",
  },
};

export const End: Story = {
  args: {
    id: "group_4",
    title: "Travel",
    transactionCount: 4,
    total: 1250.0,
    relativePosition: "end",
  },
};
