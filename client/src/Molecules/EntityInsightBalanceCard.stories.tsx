import { EntityInsightBalanceCard } from "@/Molecules/EntityInsightBalanceCard";
import { toDateIso } from "@/Utils/date-iso";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EntityInsightBalanceCard> = {
  title: "Molecules/EntityInsightBalanceCard",
  component: EntityInsightBalanceCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EntityInsightBalanceCard>;

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

export const SingleWidth: Story = {
  args: {
    size: "single",
    balance: 55000,
  },
};
