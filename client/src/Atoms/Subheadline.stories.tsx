import type { Meta, StoryObj } from "@storybook/react";
import { Subheadline } from "./Subheadline";

const meta = {
  title: "Atoms/Subheadline",
  component: Subheadline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Subheadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Subheadline text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Subheadline text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Subheadline text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Subheadline text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Subheadline text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Subheadline text",
    alignment: "Center",
  },
};
