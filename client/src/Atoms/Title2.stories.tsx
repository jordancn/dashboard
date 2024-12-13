import type { Meta, StoryObj } from "@storybook/react";
import { Title2 } from "./Title2";

const meta = {
  title: "Atoms/Title2",
  component: Title2,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Title2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Title2 text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Title2 text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Title2 text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Title2 text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Title2 text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Title2 text",
    alignment: "Center",
  },
};
