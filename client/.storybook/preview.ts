import "@/app/globals.css";
import type { Preview } from "@storybook/react";
import React from "react";
import { DeviceDataProvider } from "../src/Providers/DeviceDataProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement(DeviceDataProvider, null, React.createElement(Story)),
  ],
};

export default preview;
