import { SidebarListItem } from "@/Molecules/SidebarListItem";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarListItem> = {
  title: "Molecules/SidebarListItem",
  component: SidebarListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarListItem>;

export const Default: Story = {
  args: {
    title: "List Item",
    path: "/path",
    entityId: "overview",
  },
};

export const WithStringIcon: Story = {
  args: {
    title: "List Item with Icon",
    icon: "home",
    path: "/home",
    entityId: "home",
  },
};

export const WithComponentIcon: Story = {
  args: {
    title: "List Item with Component Icon",
    icon: ({ className }) => <div className={className}>Icon</div>,
    path: "/custom",
    entityId: "custom",
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
    // Mock window.location.href to simulate selected state
    mockLocation: {
      href: "http://localhost:6006/selected",
    },
  },
};
