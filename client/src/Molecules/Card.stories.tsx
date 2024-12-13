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
    size: "single",
    children: <div style={{ padding: "20px" }}>Single Size Card Content</div>,
  },
};

export const DoubleSize: Story = {
  args: {
    size: "double",
    children: <div style={{ padding: "20px" }}>Double Size Card Content</div>,
  },
};

export const TripleSize: Story = {
  args: {
    size: "triple",
    children: <div style={{ padding: "20px" }}>Triple Size Card Content</div>,
  },
};

export const QuadrupleSize: Story = {
  args: {
    size: "quadruple",
    children: (
      <div style={{ padding: "20px" }}>Quadruple Size Card Content</div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    size: "single",
    href: "/entity/123/insights",
    children: <div style={{ padding: "20px" }}>Click me!</div>,
  },
};
