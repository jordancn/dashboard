import type { Meta, StoryObj } from "@storybook/react";
import { SidebarTitle } from "./SidebarTitle";

const meta = {
  title: "Atoms/SidebarTitle",
  component: SidebarTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title",
    children: "Sample Children",
  },
};
