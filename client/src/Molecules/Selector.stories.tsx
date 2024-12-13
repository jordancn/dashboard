import { Selector } from "@/Molecules/Selector";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Selector> = {
  title: "Molecules/Selector",
  component: Selector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Selector>;

export const Default: Story = {
  args: {
    size: "single",
    options: [
      { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
      { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
      { label: "Option 3", onClick: () => console.log("Option 3 clicked") },
    ],
    selectedOptionLabel: "Option 1",
  },
};

export const WithDisabledOption: Story = {
  args: {
    size: "single",
    options: [
      { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
      {
        label: "Option 2",
        onClick: () => console.log("Option 2 clicked"),
        disabled: true,
      },
      { label: "Option 3", onClick: () => console.log("Option 3 clicked") },
    ],
    selectedOptionLabel: "Option 1",
  },
};

export const DifferentSizes: Story = {
  args: {
    size: "double",
    options: [
      { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
      { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
    ],
    selectedOptionLabel: "Option 2",
  },
};

export const Triple: Story = {
  args: {
    size: "double",
    options: [
      { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
      { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
      { label: "Option 3", onClick: () => console.log("Option 3 clicked") },
    ],
    selectedOptionLabel: "Option 2",
  },
};
