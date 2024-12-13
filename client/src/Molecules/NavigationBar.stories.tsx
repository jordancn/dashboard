import { NavigationBar } from "@/Molecules/NavigationBar";
import { SidebarDataProvider } from "@/Providers/SidebarDataProvider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavigationBar> = {
  title: "Molecules/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarDataProvider>
        <Story />
      </SidebarDataProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  args: {},
};

export const WithChildren: Story = {
  args: {
    children: <div>Navigation Content</div>,
  },
};
