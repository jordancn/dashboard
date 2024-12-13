import type { Meta, StoryObj } from "@storybook/react";
import { ScrollMarker } from "./ScrollMarker";

const meta = {
  title: "Atoms/ScrollMarker",
  component: ScrollMarker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "example-id",
    children: "Example content",
  },
};

export const FullHeight: Story = {
  args: {
    id: "full-height-example",
    fullHeight: true,
    children: "Full height content",
  },
};
