import { Card } from "@/Molecules/Card";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const HalfSize: Story = {
  args: {
    size: "half",
    children: <div style={{ padding: "20px" }}>Half Size Card Content</div>,
  },
};

export const SingleSize: Story = {
  args: {
    size: "full",
    children: <div style={{ padding: "20px" }}>Single Size Card Content</div>,
  },
};

export const QuarterSize: Story = {
  args: {
    size: "quarter",
    children: <div style={{ padding: "20px" }}>Quarter Size Card Content</div>,
  },
};

export const Clickable: Story = {
  args: {
    size: "full",
    href: "/entity/123/insights",
    children: <div style={{ padding: "20px" }}>Click me!</div>,
  },
};
