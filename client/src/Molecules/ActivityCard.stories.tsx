import { ActivityCard } from "@/Molecules/ActivityCard";
import { toDateIso } from "@/Utils/date-iso";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ActivityCard> = {
  title: "Molecules/ActivityCard",
  component: ActivityCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

const mockActivity = [
  {
    groupIndex: 0,
    start: toDateIso("2024-01-01"),
    end: toDateIso("2024-01-07"),
    value: 100,
    totalIncome: 1000,
    totalExpenses: 800,
  },
  {
    groupIndex: 1,
    start: toDateIso("2024-01-08"),
    end: toDateIso("2024-01-14"),
    value: 200,
    totalIncome: 1200,
    totalExpenses: 600,
  },
  {
    groupIndex: 2,
    start: toDateIso("2024-01-15"),
    end: toDateIso("2024-01-21"),
    value: 300,
    totalIncome: 800,
    totalExpenses: 900,
  },
];

export const WeekdayActivity: Story = {
  args: {
    entityId: "123",
    activityGroup: "Weekday",
    activity: mockActivity,
  },
};

export const WeekActivity: Story = {
  args: {
    entityId: "123",
    activityGroup: "Week",
    activity: mockActivity,
  },
};

export const MonthActivity: Story = {
  args: {
    entityId: "123",
    activityGroup: "Month",
    activity: mockActivity,
  },
};

export const YearActivity: Story = {
  args: {
    entityId: "123",
    activityGroup: "Year",
    activity: mockActivity,
  },
};
