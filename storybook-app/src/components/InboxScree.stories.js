import React from "react";

import InboxScreen from "./InboxScreen";
import store from "../lib/store";
import { rest } from "msw";
import { MockedState } from "./TodoReduxList.stories";
import { Provider } from "react-redux";

import { fireEvent, within, waitFor, waitForElementToBeRemoved } from "@storybook/testing-library";

export default {
  component: InboxScreen,
  title: "components/User/InboxScreen",
  decorators: [
    story => (
      <Provider store={store}>
        {story()}
      </Provider>
    ),
  ],
};

const Template = () => <InboxScreen />

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.json(MockedState.todos));
        }
      ),
    ],
  },
};

export const Error = Template.bind({})
Error.parameters = {
  msw: {
    handlers: [
      rest.get(
        'https://jsonplaceholder.typicode.com/todos?userId=1',
        (req, res, ctx) => {
          return res(ctx.status(403));
        }
      ),
    ],
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
  await waitFor(async () => {
    await fireEvent.click(canvas.getByLabelText("pinTodo-1"));
    await fireEvent.click(canvas.getByLabelText("pinTodo-3"))
  });
};