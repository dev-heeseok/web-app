// src/lib/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const defaultTodos = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const initialState = {
  todos: defaultTodos,
  status: "idle",
  error: null,
};

const TodoSlice = createSlice({
  name: "todobox",
  initialState,
  reducers: {
    updateTodoState: (state, action) => {
      const { id, newTodoState } = action.payload;
      const todo = state.todos.findIndex((t) => t.id === id);
      if (todo >= 0) {
        state.todos[todo].state = newTodoState;
      }
    },
  },
});

export const { updateTodoState } = TodoSlice.actions;

const store = configureStore({
  reducer: {
    todobox: TodoSlice.reducer,
  },
});

export default store;