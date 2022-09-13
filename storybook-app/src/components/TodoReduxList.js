// src/compoents/TodoReduxList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Todo from "./Todo";
import { updateTodoState } from "../lib/store";

const Loading = () => {
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  return (
    <div className="list-items" data-testid="loading" key={"loading"}>
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
      {LoadingRow}
    </div>
  );
}

const Empty = () => {
  return (
    <div className="list-items" key={"empty"} data-testid="empty">
      <div className="wrapper-message">
        <span className="icon-check" />
        <div className="title-message">You have no todos</div>
        <div className="subtitle-message">Sit back and relax</div>
      </div>
    </div>
  );
}

export default function TodoReduxList() {
  const dispatch = useDispatch();
  const pinTodo = (value) => {
    dispatch(updateTodoState({ id: value, newTodoState: "TASK_PINNED" }));
  }
  const archiveTodo = (value) => {
    dispatch(updateTodoState({ id: value, newTodoState: "TASK_ARCHIVED" }));
  }

  const todos = useSelector((state) => {
    const todosInOrder = [
      ...state.todobox.todos.filter((t) => t.state === "TASK_PINNED"),
      ...state.todobox.todos.filter((t) => t.state !== "TASK_PINNED"),
    ];
    return todosInOrder;
    // const filteredTodos = todosInOrder.filter(
    //   (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    // );
    // return filteredTodos;
  });

  const { status } = useSelector(state => state.todobox);
  if (status === "loading") {
    return Loading();
  }
  if (todos.length === 0) {
    return Empty();
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onPinTodo={(todo) => pinTodo(todo)}
          onArchiveTodo={(todo) => archiveTodo(todo)}
        />
      ))}
    </div>
  );
}