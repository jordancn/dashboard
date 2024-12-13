import { Toolbar } from "@/Molecules/Toolbar";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toolbar> = {
  title: "Molecules/Toolbar",
  component: Toolbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Empty: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: <div>Toolbar Content</div>,
  },
};
