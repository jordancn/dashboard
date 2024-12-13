import { TransactionGroupCards } from "@/Organisms/TransactionGroupCards";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TransactionGroupCards> = {
  title: "Organisms/TransactionGroupCards",
  component: TransactionGroupCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TransactionGroupCards>;

export const Default: Story = {
  args: {
    transactionGroups: [
      {
        id: "1",
        count: 5,
        total: 250.75,
        start: toDateIso("2023-01-01"),
        end: toDateIso("2023-01-31"),
      },
      {
        id: "2",
        count: 8,
        total: 425.5,
        start: toDateIso("2023-02-01"),
        end: toDateIso("2023-02-28"),
      },
      {
        id: "3",
        count: 6,
        total: 325.25,
        start: toDateIso("2023-03-01"),
        end: toDateIso("2023-03-31"),
      },
    ],
    entityId: "personal",
  },
};

export const Empty: Story = {
  args: {
    transactionGroups: [],
    entityId: "personal",
  },
};

export const SingleGroup: Story = {
  args: {
    transactionGroups: [
      {
        id: "1",
        count: 5,
        total: 250.75,
        start: toDateIso("2023-01-01"),
        end: toDateIso("2023-01-31"),
      },
    ],
    entityId: "personal",
  },
};
