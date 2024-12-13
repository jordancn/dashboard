import type { Meta, StoryObj } from "@storybook/react";
import { Title1 } from "./Title1";

const meta = {
  title: "Atoms/Title1",
  component: Title1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Title1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Title1 text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Title1 text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Title1 text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Title1 text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Title1 text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Title1 text",
    alignment: "Center",
  },
};
