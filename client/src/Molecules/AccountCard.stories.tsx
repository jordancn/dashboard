import { AccountCard } from "@/Molecules/AccountCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/AccountCard",
  component: AccountCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AccountCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Checking Account",
    currentBalance: 5000.75,
    entity: {
      id: "ent1",
      name: "Personal",
    },
    number: "1234",
    accountType: "Checking",
    relativePosition: "single",
  },
};

export const WithOverviewEntity: Story = {
  args: {
    ...Default.args,
    name: "Savings Account",
    currentBalance: 10000.5,
    accountType: "Savings",
    number: "5678",
  },
  parameters: {
    routeParams: {
      entityId: "overview",
    },
  },
};
