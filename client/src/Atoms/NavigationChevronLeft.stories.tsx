import type { Meta, StoryObj } from "@storybook/react";
import { NavigationChevronLeft } from "./NavigationChevronLeft";

const meta = {
  title: "Atoms/NavigationChevronLeft",
  component: NavigationChevronLeft,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationChevronLeft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
