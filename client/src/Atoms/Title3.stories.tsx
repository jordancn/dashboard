import type { Meta, StoryObj } from "@storybook/react";
import { Title3 } from "./Title3";

const meta = {
  title: "Atoms/Title3",
  component: Title3,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Title3>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Title3 text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Title3 text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Title3 text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Title3 text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Title3 text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Title3 text",
    alignment: "Center",
  },
};
