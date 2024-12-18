import type { Meta, StoryObj } from "@storybook/react";
import { Caption1 } from "./Caption1";

const meta = {
  title: "Atoms/Caption1",
  component: Caption1,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Caption1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Caption1 text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Caption1 text",
    ordinal: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Caption1 text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Caption1 text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Caption1 text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Caption1 text",
    alignment: "Center",
  },
};
