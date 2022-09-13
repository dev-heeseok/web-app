// src/components/TodoList.stories.js
import React from "react";

import TodoList from "./TodoList";
import * as TodoStories from "./Todo.stories";

export default {
  component: TodoList,
  title: "components/User/TodoList",
  decorators: [
    story => (
      <div style={{ padding: "3rem" }}>
        {story()}
      </div>
    ),
  ],
}

const Template = args => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  todos: [
    { ...TodoStories.Default.args.todo, id: "1", title: "Todo 1" },
    { ...TodoStories.Default.args.todo, id: "2", title: "Todo 2" },
    { ...TodoStories.Default.args.todo, id: "3", title: "Todo 3" },
    { ...TodoStories.Default.args.todo, id: "4", title: "Todo 4" },
    { ...TodoStories.Default.args.todo, id: "5", title: "Todo 5" },
    { ...TodoStories.Default.args.todo, id: "6", title: "Todo 6" },
  ],
};

export const WithPinnedTodos = Template.bind({});
WithPinnedTodos.args = {
  todos: [
    ...Default.args.todos.slice(0, 5),
    { id: "6", title: "Todo 6 (pinned)", state: "TASK_PINNED" },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  todos: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false,
};

