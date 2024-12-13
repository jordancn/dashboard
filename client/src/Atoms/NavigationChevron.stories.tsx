import type { Meta, StoryObj } from "@storybook/react";
import { NavigationChevron } from "./NavigationChevron";

const meta = {
  title: "Atoms/NavigationChevron",
  component: NavigationChevron,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationChevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
