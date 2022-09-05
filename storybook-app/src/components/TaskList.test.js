import { render } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as TaskListStories from "./TaskList.stories";

const { WithPinnedTasks } = composeStories(TaskListStories);

it('renders pinned tasks at the start of the list', () => {
  const { container } = render(<WithPinnedTasks />);

  expect(
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    container.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]')
  ).not.toBe(null);
});