import type { Meta, StoryObj } from "@storybook/react";
import styles from "./Page.module.css";

export const Page = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div id="page" className={styles.page}>
      {children}
    </div>
  );
};

const meta: Meta<typeof Page> = {
  title: "Atoms/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    children: <div>Page Content</div>,
  },
};

export const Empty: Story = {
  args: {},
};
