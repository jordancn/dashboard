import type { Meta, StoryObj } from "@storybook/react";
import { Chevron } from "./Chevron";

const meta = {
  title: "Atoms/Chevron",
  component: Chevron,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
