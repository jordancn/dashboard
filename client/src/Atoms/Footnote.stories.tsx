import type { Meta, StoryObj } from "@storybook/react";
import { Footnote } from "./Footnote";

const meta = {
  title: "Atoms/Footnote",
  component: Footnote,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footnote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Footnote text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Footnote text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Footnote text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Footnote text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Footnote text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Footnote text",
    alignment: "Center",
  },
};
