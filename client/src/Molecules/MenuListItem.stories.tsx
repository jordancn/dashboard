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
    icon: "cog",
    path: "/settings",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Dashboard",
    icon: ({ className }) => (
      <svg className={className} viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
    path: "/dashboard",
  },
};
