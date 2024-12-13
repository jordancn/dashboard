import { MenuListHeading } from "@/Molecules/MenuListHeading";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuListHeading> = {
  title: "Molecules/MenuListHeading",
  component: MenuListHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MenuListHeading>;

export const Default: Story = {
  args: {
    title: "Menu Section",
  },
};

export const LongTitle: Story = {
  args: {
    title: "This is a very long menu section heading that might wrap",
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Menu",
  },
};
