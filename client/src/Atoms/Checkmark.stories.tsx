import type { Meta, StoryObj } from "@storybook/react";
import { Checkmark } from "./Checkmark";

const meta = {
  title: "Atoms/Checkmark",
  component: Checkmark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
