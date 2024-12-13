import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "./Empty";

const meta = {
  title: "Atoms/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Example content",
  },
};
