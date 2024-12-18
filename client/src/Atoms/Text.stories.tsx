import { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
  title: "Atoms/Text",
  argTypes: {
    mode: {
      control: "select",
      options: ["Light", "Dark"],
    },
    ordinal: {
      control: "select",
      options: ["Primary", "Secondary", "Tertiary", "Quarternary"],
    },
    variant: {
      control: "select",
      options: ["Opaque", "Vibrant"],
    },
    weight: {
      control: "select",
      options: ["Regular", "Bold"],
    },
    style: {
      control: "select",
      options: ["Normal", "Italic"],
    },
    alignment: {
      control: "select",
      options: ["Left", "Center", "Right"],
    },
    size: {
      control: "select",
      options: [
        "LargeTitle",
        "Title1",
        "Title2",
        "Title3",
        "Headline",
        "Body",
        "Callout",
        "Subheadline",
        "Footnote",
        "Caption1",
        "Caption2",
      ],
    },
    value: {
      control: "text",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    value: "Sample Text",
  },
};

export const MobileLight: Story = {
  args: {
    mode: "Light",
    value: "Mobile Light Text",
  },
};

export const DesktopDark: Story = {
  args: {
    mode: "Dark",
    value: "Desktop Dark Text",
  },
};

export const LargeTitleBold: Story = {
  args: {
    size: "LargeTitle",
    weight: "Bold",
    value: "Large Title Bold Text",
  },
};

export const CenteredItalic: Story = {
  args: {
    alignment: "Center",
    style: "Italic",
    value: "Centered Italic Text",
  },
};
