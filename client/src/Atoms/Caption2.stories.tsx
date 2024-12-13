import type { Meta, StoryObj } from "@storybook/react";
import { Caption2 } from "./Caption2";

const meta = {
  title: "Atoms/Caption2",
  component: Caption2,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Caption2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is Caption2 text",
  },
};

export const WithColor: Story = {
  args: {
    title: "Colored Caption2 text",
    color: "Primary",
  },
};

export const WithVariant: Story = {
  args: {
    title: "Caption2 text with variant",
    variant: "Vibrant",
  },
};

export const WithWeight: Story = {
  args: {
    title: "Bold Caption2 text",
    weight: "Bold",
  },
};

export const WithStyle: Story = {
  args: {
    title: "Italic Caption2 text",
    style: "Italic",
  },
};

export const WithAlignment: Story = {
  args: {
    title: "Center aligned Caption2 text",
    alignment: "Center",
  },
};
