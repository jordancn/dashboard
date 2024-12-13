import { TextInput } from "@/Molecules/TextInput";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextInput> = {
  title: "Molecules/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    value: "",
    onChange: (value: string) => console.log("Input changed:", value),
  },
};

export const WithInitialValue: Story = {
  args: {
    placeholder: "Enter text...",
    value: "Initial text",
    onChange: (value: string) => console.log("Input changed:", value),
  },
};

export const Multiline: Story = {
  args: {
    placeholder: "Enter multiple lines...",
    value: "",
    onChange: (value: string) => console.log("Input changed:", value),
    multiline: true,
  },
};

export const MultilineWithValue: Story = {
  args: {
    placeholder: "Enter multiple lines...",
    value: "Line 1\nLine 2\nLine 3",
    onChange: (value: string) => console.log("Input changed:", value),
    multiline: true,
  },
};
