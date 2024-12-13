import { AccountCards } from "@/Organisms/AccountCards";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AccountCards> = {
  title: "Organisms/AccountCards",
  component: AccountCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AccountCards>;

export const Default: Story = {
  args: {
    accounts: [
      {
        id: "acc_123",
        name: "Checking Account",
        currentBalance: 5000.5,
        institution: {
          id: "inst_1",
          name: "Big Bank",
        },
        entity: {
          id: "ent_1",
          name: "Personal",
        },
        number: "1234",
        accountType: "Checking",
      },
      {
        id: "acc_124",
        name: "Savings Account",
        currentBalance: 10000.75,
        institution: {
          id: "inst_1",
          name: "Big Bank",
        },
        entity: {
          id: "ent_1",
          name: "Personal",
        },
        number: "5678",
        accountType: "Savings",
      },
      {
        id: "acc_125",
        name: "Credit Card",
        currentBalance: -1500.25,
        institution: {
          id: "inst_2",
          name: "Other Bank",
        },
        entity: {
          id: "ent_1",
          name: "Personal",
        },
        number: "9012",
        accountType: "Credit",
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    accounts: [],
  },
};

export const SingleAccount: Story = {
  args: {
    accounts: [
      {
        id: "acc_123",
        name: "Checking Account",
        currentBalance: 5000.5,
        institution: {
          id: "inst_1",
          name: "Big Bank",
        },
        entity: {
          id: "ent_1",
          name: "Personal",
        },
        number: "1234",
        accountType: "Checking",
      },
    ],
  },
};
