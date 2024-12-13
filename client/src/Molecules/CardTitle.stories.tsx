import { CardTitle } from "@/Molecules/CardTitle";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CardTitle> = {
  title: "Molecules/CardTitle",
  component: CardTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardTitle>;

export const Default: Story = {
  args: {
    title: "Example Card Title",
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
};
