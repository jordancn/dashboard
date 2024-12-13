import { SidebarContentsDocument } from "@/GraphQL/client.gen";
import { SidebarContents } from "@/Organisms/SidebarContents";
import { MockedProvider } from "@apollo/client/testing";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarContents> = {
  title: "Organisms/SidebarContents",
  component: SidebarContents,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: SidebarContentsDocument,
            },
            result: {
              data: {
                entities: [
                  {
                    id: "1",
                    name: "Personal",
                  },
                  {
                    id: "2",
                    name: "Retirement",
                  },
                ],
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarContents>;

export const Default: Story = {};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: SidebarContentsDocument,
            },
            result: {
              data: {
                entities: [],
              },
            },
            delay: Infinity,
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <MockedProvider
        mocks={[
          {
            request: {
              query: SidebarContentsDocument,
            },
            result: {
              data: {
                entities: [],
              },
            },
          },
        ]}
      >
        <Story />
      </MockedProvider>
    ),
  ],
};
