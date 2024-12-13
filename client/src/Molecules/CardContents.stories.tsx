import { CardContents } from "@/Molecules/CardContents";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CardContents> = {
  title: "Molecules/CardContents",
  component: CardContents,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardContents>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: "20px" }}>Default Card Contents</div>,
  },
};

export const Start: Story = {
  args: {
    position: "start",
    children: <div style={{ padding: "20px" }}>Start Position Content</div>,
  },
};

export const Middle: Story = {
  args: {
    position: "middle",
    children: <div style={{ padding: "20px" }}>Middle Position Content</div>,
  },
};

export const End: Story = {
  args: {
    position: "end",
    children: <div style={{ padding: "20px" }}>End Position Content</div>,
  },
};

export const Single: Story = {
  args: {
    position: "single",
    children: <div style={{ padding: "20px" }}>Single Position Content</div>,
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: <div style={{ padding: "20px" }}>Transparent Variant</div>,
  },
};

export const Translucent: Story = {
  args: {
    variant: "translucent",
    children: <div style={{ padding: "20px" }}>Translucent Variant</div>,
  },
};

export const Error: Story = {
  args: {
    state: "error",
    children: <div style={{ padding: "20px" }}>Error State</div>,
  },
};
