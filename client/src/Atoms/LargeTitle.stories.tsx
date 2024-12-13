import type { Meta, StoryObj } from "@storybook/react";
import { LargeTitle } from "./LargeTitle";

const meta = {
  title: "Atoms/LargeTitle",
  component: LargeTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LargeTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Headline text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Headline text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Headline text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Headline text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Headline text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Headline text",
    alignment: "Center",
  },
};
