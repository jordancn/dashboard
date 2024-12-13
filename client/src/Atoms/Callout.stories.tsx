import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";

const meta = {
  title: "Atoms/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Callout text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Callout text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Callout text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Callout text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Callout text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Callout text",
    alignment: "Center",
  },
};
