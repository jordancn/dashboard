import {
  AppStateProvider,
  useAppState,
  useSetActivityGroup,
  useSetGroupIndex,
} from "@/Providers/AppStateProvider";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AppStateProvider> = {
  title: "Providers/AppStateProvider",
  component: AppStateProvider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppStateProvider>;

export const Default: Story = {
  args: {
    children: <div>App State Provider Content</div>,
  },
};

const StateDisplay = () => {
  const state = useAppState();
  const setActivityGroup = useSetActivityGroup();
  const setGroupIndex = useSetGroupIndex();

  return (
    <div>
      <div>Activity Group: {state.activityGroup}</div>
      <div>Group Index: {state.groupIndex}</div>

      <button onClick={() => setActivityGroup("Week")}>Set Week</button>
      <button onClick={() => setGroupIndex(1)}>Set Group Index</button>
    </div>
  );
};

export const WithNestedStateAccess: Story = {
  args: {
    children: (
      <div>
        <StateDisplay />
      </div>
    ),
  },
};
