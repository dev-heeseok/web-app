// src/components/Todo.js
import React from "react";
import PropTypes from "prop-types";

export default function Todo({ todo: { id, title, state }, onArchiveTodo, onPinTodo }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TASK_ARCHIVED"}
          checked={state === "TASK_ARCHIVED"}
          disabled={true}
          name="checked"
        />
        <span
          className="checked-custom"
          onClick={() => onArchiveTodo(id)}
          id={`archiveTodo-${id}`}
          aria-label={`archiveTodo-${id}`}
        />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTodo(id)}>
            <span
              className={"icon-star"}
              id={`pinTodo-${id}`}
              aria-label={`pinTodo-${id}`}
            />
          </a>
        )}
      </div>
    </div>
  );
}

Todo.propTypes = {
  /** Composition of the Todo */
  todo: PropTypes.shape({
    /** id of the todo */
    id: PropTypes.string.isRequired,
    /** title of the todo */
    title: PropTypes.string.isRequired,
    /** current state of the todo */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the todo to archived */
  onArchiveTodo: PropTypes.func,
  /** Event to change the todo to pinned */
  onPinTodo: PropTypes.func,
};
