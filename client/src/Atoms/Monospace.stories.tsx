import type { Meta, StoryObj } from "@storybook/react";
import { Monospace } from "./Monospace";

const meta = {
  title: "Atoms/Monospace",
  component: Monospace,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Monospace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Monospace text",
  },
};

export const Primary: Story = {
  args: {
    title: "Primary Monospace text",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Monospace text",
    variant: "secondary",
  },
};
