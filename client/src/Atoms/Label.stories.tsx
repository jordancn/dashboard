import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Example Label",
  },
};

export const Primary: Story = {
  args: {
    title: "Primary Label",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Label",
    variant: "secondary",
  },
};

export const WithClick: Story = {
  args: {
    title: "Clickable Label",
    onClick: () => alert("Label clicked!"),
  },
};
