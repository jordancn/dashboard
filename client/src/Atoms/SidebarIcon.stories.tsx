import type { Meta, StoryObj } from "@storybook/react";
import { SidebarIcon } from "./SidebarIcon";

const meta = {
  title: "Atoms/SidebarIcon",
  component: SidebarIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
