import {
  DeviceDataProvider,
  useDeviceData,
} from "@/Providers/DeviceDataProvider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DeviceDataProvider> = {
  title: "Providers/DeviceDataProvider",
  component: DeviceDataProvider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DeviceDataProvider>;

const DeviceDataDisplay = () => {
  const deviceData = useDeviceData();

  if (deviceData.status !== "LOADED") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Is Mobile: {deviceData.value.isMobile.toString()}</div>
      <div>Orientation: {deviceData.value.orientation}</div>
    </div>
  );
};

export const Default: Story = {
  args: {
    children: <DeviceDataDisplay />,
  },
};
