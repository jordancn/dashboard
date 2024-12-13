import { ContentScrollable } from "@/Templates/ContentScrollable";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ContentScrollable> = {
  title: "Templates/ContentScrollable",
  component: ContentScrollable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ContentScrollable>;

export const Default: Story = {
  args: {
    children: <div>Content goes here</div>,
  },
};

export const WrapCards: Story = {
  args: {
    type: "wrap-cards",
    children: (
      <>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 1
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 2
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 3
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 4
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 5
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 6
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 7
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 8
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 9
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 10
        </div>
      </>
    ),
  },
};

export const WrapCardsColumn: Story = {
  args: {
    type: "wrap-cards",
    direction: "column",
    children: (
      <>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 1
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 2
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 3
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 4
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 5
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 6
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 7
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 8
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 9
        </div>
        <div style={{ width: 200, height: 200, backgroundColor: "lightgray" }}>
          Card 10
        </div>
      </>
    ),
  },
};

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    children: (
      <div style={{ backgroundColor: "lightgray", height: "100%" }}>
        Full height content
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div style={{ backgroundColor: "lightgray", width: "100%" }}>
        Full width content
      </div>
    ),
  },
};
