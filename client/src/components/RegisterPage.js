import React, { useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../reducers/userReducers'

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(registerUser({ email: email, userName: userName, password: password }))
      .then(res => {
        const result = unwrapResult(res);
        console.log('register user', result);
        if (result.success) {
          navigate('/');
        }
        else {
          alert('failed register user');
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div>
      <h3>Register Paage</h3>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail}></input>
        <label>User Name</label>
        <input type="text" value={userName} onChange={onChangeUserName}></input>
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword}></input>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default RegisterPage