import { SidebarListHeading } from "@/Molecules/SidebarListHeading";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarListHeading> = {
  title: "Molecules/SidebarListHeading",
  component: SidebarListHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarListHeading>;

export const Default: Story = {
  args: {
    title: "Section Title",
  },
};

export const LongTitle: Story = {
  args: {
    title: "This is a very long section title that might wrap",
  },
};
