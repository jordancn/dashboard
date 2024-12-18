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
    value: "$1,234.56",
  },
};

export const LargeAmount: Story = {
  args: {
    value: "$1,234,567,890,123,456.78",
  },
};

export const SmallAmount: Story = {
  args: {
    value: "$1",
  },
};
