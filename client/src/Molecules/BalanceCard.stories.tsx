import { BalanceCard } from "@/Molecules/BalanceCard";
import { toDateIso } from "@/Utils/date-iso";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BalanceCard> = {
  title: "Molecules/BalanceCard",
  component: BalanceCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: {
    balance: 15000,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Current Balance",
    balance: 25000,
  },
};

export const WithDate: Story = {
  args: {
    balance: 35000,
    date: toDateIso("2024-01-15"),
  },
};

export const WithLink: Story = {
  args: {
    balance: 45000,
    href: "/entity/123/insights",
  },
};

export const FullWidth: Story = {
  args: {
    size: "full",
    balance: 55000,
  },
};
