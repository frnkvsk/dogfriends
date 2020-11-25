import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  getUserInfo
} from './api/DogfriendsApi';


export const loginSlice = createAsyncThunk(
  'login',
  async (payload) => {
    console.log('dogfriendsUserSlice payload',payload)
    const response = await login({
      username: payload.username,
      password: payload.password
    });
    return response.data;
  }
);

export const getUserInfoSlice = createAsyncThunk(
  'getUserInfo',
  async (payload) => {
    // console.log('dogfriendsUserSlice payload',payload)
    const response = await getUserInfo(payload);
    return response.data;
  }
);

export const dogfriendsUserSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: {
      status: 'idle',
      data: {},
      error: {}
    }
  },
  reducers: {
    logout: (state, action) => {
      state.userList = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    }
  },
  extraReducers: {
    // login
    [login.pending]: (state, action) => {
      state.userList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [login.fulfilled]: (state, action) => {
      state.userList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [login.rejected]: (state, action) => {
      state.userList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    }, 
    // get user info
    [getUserInfoSlice.pending]: (state, action) => {
      state.userList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getUserInfoSlice.fulfilled]: (state, action) => {
      state.userList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getUserInfoSlice.rejected]: (state, action) => {
      state.userList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    }, 
  }
});

export const {
  logout,
  setUserList
} = dogfriendsUserSlice.actions;

export const selectUser = state => state.userList.userList;

export default dogfriendsUserSlice.reducer;