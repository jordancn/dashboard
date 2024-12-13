import { SidebarButton } from "@/Molecules/SidebarButton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarButton> = {
  title: "Molecules/SidebarButton",
  component: SidebarButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarButton>;

export const Default: Story = {
  args: {},
};

export const WithClickHandler: Story = {
  args: {
    onClick: () => alert("Sidebar button clicked!"),
  },
};
