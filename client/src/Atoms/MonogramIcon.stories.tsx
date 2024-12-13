import type { Meta, StoryObj } from "@storybook/react";
import { MonogramIcon } from "./MonogramIcon";

const meta: Meta<typeof MonogramIcon> = {
  title: "Atoms/MonogramIcon",
  component: MonogramIcon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MonogramIcon>;

export const Default: Story = {
  args: {
    name: "Example Name",
  },
};

export const SingleLetter: Story = {
  args: {
    name: "X",
  },
};

export const LongName: Story = {
  args: {
    name: "Very Long Example Name",
  },
};
