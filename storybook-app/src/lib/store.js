// src/lib/store.js
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const defaultTodos = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");

  const data = await response.json();
  const result = data.map((todo) => ({
    id: `${todo.id}`,
    title: todo.title,
    state: todo.completed ? "TASK_ARCHIVED" : "TASK_INBOX"
  }));

  return result;
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.todos = [];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong"
        state.todos = [];
      });
  },
});

export const { updateTodoState } = TodoSlice.actions;

const store = configureStore({
  reducer: {
    todobox: TodoSlice.reducer,
  },
});

export default store;