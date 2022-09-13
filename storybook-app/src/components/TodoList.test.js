// src/components/TodoList.test.js
import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";

import * as TodoListStories from "./TodoList.stories";

const { WithPinnedTodos } = composeStories(TodoListStories);

it("renders pinned todos at the start of the list", () => {
  const { container } = render(<WithPinnedTodos />);

  expect(
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    container.querySelector('.list-item:nth-child(1) input[value="Todo 6 (pinned)"]')
  ).not.toEqual(null);
});