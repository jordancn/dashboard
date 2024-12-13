import { Loading } from "@/Templates/Loading";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Loading> = {
  title: "Templates/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    children: <div>Loading content...</div>,
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div>
        <h2>Loading your data</h2>
        <p>Please wait while we fetch your information...</p>
      </div>
    ),
  },
};
