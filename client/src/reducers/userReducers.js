import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('user/loginUser', async (userInfo, thunkAPI) => {
  try {
    const { data } = await axios
      .post('/api/users/login', {
        email: userInfo.email,
        password: userInfo.password
      });

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('user login failed');
  }
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (userInfo, thunkAPI) => {
  try {
    const { data } = await axios
      .get('/api/users/logout');

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('user logout failed');
  }
});

export const registerUser = createAsyncThunk('user/registerUser', async (userInfo, thunkAPI) => {
  try {
    const { data } = await axios
      .post('/api/users/register', {
        email: userInfo.email,
        userName: userInfo.userName,
        password: userInfo.password
      });

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue('user register failed');
  }
});

const initialState = {
  email: "",
  password: "",
  loginSuccess: null,
  registerUser: null,
};

const userReducers = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginSuccess = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('loginUser rejected');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerSuccess = action.payload;
      });
  },
});

export const { setEmail, setPassword } = userReducers.actions;
export default userReducers.reducer;
