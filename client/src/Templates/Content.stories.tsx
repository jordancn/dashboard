import { SidebarDataProvider } from "@/Providers/SidebarDataProvider";
import { Content } from "@/Templates/Content";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Content> = {
  title: "Templates/Content",
  component: Content,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SidebarDataProvider>
        <Story />
      </SidebarDataProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Default: Story = {
  args: {
    children: <div style={{ border: "1px solid red" }}>Content goes here</div>,
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <div style={{ height: "200vh", border: "1px solid red" }}>
        Long scrollable content goes here
      </div>
    ),
  },
};
