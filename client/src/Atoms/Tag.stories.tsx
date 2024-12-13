import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Tag text",
  },
};

export const WithPrimaryVariant: Story = {
  args: {
    title: "Primary tag",
    variant: "Primary",
  },
};

export const WithSecondaryVariant: Story = {
  args: {
    title: "Secondary tag",
    variant: "Secondary",
  },
};

export const WithOnClick: Story = {
  args: {
    title: "Clickable tag",
    onClick: () => alert("Tag clicked!"),
  },
};
