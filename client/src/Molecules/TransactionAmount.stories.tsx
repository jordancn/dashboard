import { TransactionAmount } from "@/Molecules/TransactionAmount";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionAmount> = {
  title: "Molecules/TransactionAmount",
  component: TransactionAmount,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransactionAmount>;

export const Default: Story = {
  args: {
    value: 1234.56,
    formatter: (value) => (value ? `$${value.toFixed(2)}` : ""),
  },
};

export const LargeAmount: Story = {
  args: {
    value: 1234567890123456.78,
    formatter: (value) => (value ? `$${value.toFixed(2)}` : ""),
  },
};

export const SmallAmount: Story = {
  args: {
    value: 1,
    formatter: (value) => (value ? `$${value.toFixed(2)}` : ""),
  },
};
