import { ToolbarItem } from "@/Molecules/ToolbarItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ToolbarItem> = {
  title: "Molecules/ToolbarItem",
  component: ToolbarItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToolbarItem>;

export const Default: Story = {
  args: {
    title: "Item Title",
    path: "/some/path",
    entityId: "overview",
  },
};

export const WithStringIcon: Story = {
  args: {
    title: "Item with Icon",
    icon: "home",
    path: "/home",
    entityId: "home",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Custom Icon",
    icon: ({ className }) => <div className={className}>🔧</div>,
    path: "/tools",
    entityId: "tools",
  },
};

export const Selected: Story = {
  args: {
    title: "Selected Item",
    icon: "star",
    path: "/selected",
    entityId: "selected",
  },
  parameters: {
    url: "/selected", // This simulates being on the matching URL
  },
};
