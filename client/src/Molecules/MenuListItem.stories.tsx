import { MenuListItem } from "@/Molecules/MenuListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuListItem> = {
  title: "Molecules/MenuListItem",
  component: MenuListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MenuListItem>;

export const Default: Story = {
  args: {
    title: "Menu Item",
    path: "/some/path",
  },
};

export const WithStringIcon: Story = {
  args: {
    title: "Settings",
    path: "/settings",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Dashboard",
    path: "/dashboard",
  },
};
