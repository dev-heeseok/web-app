import React from 'react';
import PropTypes from "prop-types";

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
  return (
    <div className={`list-item ${state}`} >
      <label className="checkbox">

        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />

        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
          id={`archiveTask-${id}`}
          aria-label={`archiveTask-${id}`}
        />
      </label>

      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== "TASK_ARCHIVED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} id={`pinTask-${id}`} aria-label={`pinTask-${id}`} />
          </a>
        )}
      </div>

    </div >
  )
}

Task.propTypes = {
  /** composition of the task */
  task: PropTypes.shape({
    /** id of the task */
    id: PropTypes.string.isRequired,
    /** title of the task */
    title: PropTypes.string.isRequired,
    /** current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** event to change the task to pinned */
  onPinTask: PropTypes.func,
}

export default Task