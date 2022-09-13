// src/compoents/TodoList.js
import React from "react";
import PropTypes from "prop-types";

import Todo from "./Todo";

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

export default function TodoList({ loading, todos, onPinTodo, onArchiveTodo }) {
  if (loading) {
    return Loading();
  }

  if (todos.length === 0) {
    return Empty();
  }

  const events = {
    onPinTodo,
    onArchiveTodo,
  };

  const todosInOrder = [
    ...todos.filter((t) => t.state === "TASK_PINNED"),
    ...todos.filter((t) => t.state !== "TASK_PINNED"),
  ];

  return (
    <div className="list-items">
      {todosInOrder.map((todo) => (
        <Todo key={todo.id} todo={todo} {...events} />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  /** checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of todos */
  todos: PropTypes.arrayOf(Todo.propTypes.todo).isRequired,
  /** Event to change the todo to pinned */
  onPinTodo: PropTypes.func,
  /** Event to change the todo to archived */
  onArchiveTodo: PropTypes.func,
}

TodoList.defaultProps = {
  loading: false,
}