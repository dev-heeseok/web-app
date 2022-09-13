import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

import TodoReduxList from "./TodoReduxList";
import * as TodoStories from "./Todo.stories";

export const MockedState = {
  todos: [
    { ...TodoStories.Default.args.todo, id: "1", title: "Todo 1" },
    { ...TodoStories.Default.args.todo, id: "2", title: "Todo 2" },
    { ...TodoStories.Default.args.todo, id: "3", title: "Todo 3" },
    { ...TodoStories.Default.args.todo, id: "4", title: "Todo 4" },
    { ...TodoStories.Default.args.todo, id: "5", title: "Todo 5" },
    { ...TodoStories.Default.args.todo, id: "6", title: "Todo 6" },
  ],
  status: "idle",
  error: null,
};

const Mockstore = ({ todoboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        todobox: createSlice({
          name: "todobox",
          initialState: todoboxState,
          reducers: {
            updateTodoState: (state, action) => {
              const { id, newTodoState } = action.payload;
              const todo = state.todos.findIndex((t) => t.id === id);
              if (todo >= 0) {
                state.todos[todo].state = newTodoState;
              }
            },
          },
        }).reducer,
      }
    })}
  >
    {children}
  </Provider>
)

export default {
  component: TodoReduxList,
  title: "components/User/TodoReduxList",
  decorators: [
    story => (
      <div style={{ padding: "3rem" }}>
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*MockedState$/,
}

const Template = () => <TodoReduxList />;

export const Default = Template.bind({});
Default.decorators = [
  story => (
    <Mockstore todoboxState={MockedState}>
      {story()}
    </Mockstore>
  ),
];

export const WithPinnedTodos = Template.bind({});
WithPinnedTodos.decorators = [
  story => {
    const pinnedTodos = [
      ...MockedState.todos.slice(0, 5),
      { id: "6", title: "Todo 6 (pinned)", state: "TASK_PINNED" },
    ];

    return (
      <Mockstore
        todoboxState={{
          ...MockedState,
          todos: pinnedTodos,
        }}
      >
        {story()}
      </Mockstore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  story => (
    <Mockstore
      todoboxState={{
        ...MockedState,
        status: "loading",
      }}
    >
      {story()}
    </Mockstore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  story => (
    <Mockstore
      todoboxState={{
        ...MockedState,
        todos: [],
      }}
    >
      {story()}
    </Mockstore>
  ),
];