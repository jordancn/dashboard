import type { Meta, StoryObj } from "@storybook/react";
import { Body } from "./Body";

const meta = {
  title: "Atoms/Body",
  component: Body,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Body>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is body text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored body text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Body text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold body text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic body text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned body text",
    alignment: "Center",
  },
};
