// src/components/InboxScreen.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../lib/store';
import TodoReduxList from "./TodoReduxList";


export default function InboxScreen() {
  const dispatch = useDispatch();
  // We're retrieving the error field from out updated store
  const { error } = useSelector((state) => state.todobox);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Todobox</span>
        </h1>
      </nav>
      <TodoReduxList />
    </div>
  )
}
