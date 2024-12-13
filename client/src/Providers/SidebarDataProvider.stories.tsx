import {
  SidebarDataProvider,
  useSidebarData,
} from "@/Providers/SidebarDataProvider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarDataProvider> = {
  title: "Providers/SidebarDataProvider",
  component: SidebarDataProvider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarDataProvider>;

const SidebarDisplay = () => {
  const sidebarData = useSidebarData();

  if (sidebarData.status !== "LOADED") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Visible: {sidebarData.value.visible.toString()}</div>
      <div>Button: {sidebarData.value.button}</div>
      <div>Type: {sidebarData.value.type}</div>
      <button onClick={sidebarData.value.show}>Show</button>
      <button onClick={sidebarData.value.hide}>Hide</button>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <SidebarDisplay />,
  },
};
