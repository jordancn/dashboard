import { MenuListGroup } from "@/Molecules/MenuListGroup";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MenuListGroup> = {
  title: "Molecules/MenuListGroup",
  component: MenuListGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MenuListGroup>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div>Menu Item 1</div>
        <div>Menu Item 2</div>
        <div>Menu Item 3</div>
      </>
    ),
  },
};
