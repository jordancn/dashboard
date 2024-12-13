import { SectionHeading } from "@/Molecules/SectionHeading";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SectionHeading> = {
  title: "Molecules/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {
  args: {
    title: "Section Title",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Section Title",
    subtitle: "Subtitle Text",
  },
};

export const WithClickableSubtitle: Story = {
  args: {
    title: "Section Title",
    subtitle: "Click Me",
    href: "/",
  },
};
