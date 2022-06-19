import React from 'react'
import { unwrapResult } from '@reduxjs/toolkit';
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducers';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickedLogout = (event) => {
    dispatch(logoutUser())
      .then(res => {
        const result = unwrapResult(res);
        if (result.success) {
          navigate('/login');
        }
        else {
          alert('failed logout user');
        }
      })
  }

  return (
    <div>
      <h1>HomePage</h1>
      <Button variant="secondary" onClick={onClickedLogout}>logout</Button>
    </div>
  )
}

export default HomePage