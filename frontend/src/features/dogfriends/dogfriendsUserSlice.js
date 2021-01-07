import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  getUserInfo,
  patchUserInfo,
  preSignupUsernameCheck,
  signup,
} from './api/DogfriendsApi';


export const loginSlice = createAsyncThunk(
  'login',
  async (payload) => {
    // console.log('dogfriendsUserSlice payload',payload)
    const response = await login({
      username: payload.username,
      password: payload.password
    });
    return response.data;
  }
);

export const preSignupSlice = createAsyncThunk(
  'preSignup',
  async (payload) => {
    try {
      console.log('preSignupSlice payload',payload)
      const response = await preSignupUsernameCheck({
        username: payload.username
      });
      console.log('--preSignupSlice response',response)
      return response;
    } catch (error) {
      console.error('dogfriendsUserSlice preSignupSlice error',error)
    }
    
  }
);

export const signUpSlice = createAsyncThunk(
  'signup',
  async (payload) => {
    // console.log('dogfriendsUserSlice payload',payload)
    const response = await signup({
      username: payload.username, 
      password: payload.password, 
      first_name: payload.first_name, 
      last_name: payload.last_name, 
      email: payload.email, 
      photo_id: payload.photo_id, 
      city: payload.city, 
      state: payload.state, 
      country: payload.country
    });
    return response.data;
  }
);

export const getUserInfoSlice = createAsyncThunk(
  'getUserInfo',
  async (payload) => {
    console.log('dogfriendsUserSlice getUserInfoSlice payload',payload)
    const response = await getUserInfo(payload);
    console.log('dogfriendsUserSlice getUserInfoSlice response',response)
    return response.data;
  }
);

export const updateUserInfoSlice = createAsyncThunk(
  'patchUserInfo',
  async (payload) => {
    console.log('updateUserInfoSlice payload',payload)
    const response = await patchUserInfo(payload);
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
    },
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
    // signup
    [signup.pending]: (state, action) => {
      state.userList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [signup.fulfilled]: (state, action) => {
      state.userList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [signup.rejected]: (state, action) => {
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
    // patch/update user info
    [updateUserInfoSlice.pending]: (state, action) => {
      state.userList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [updateUserInfoSlice.fulfilled]: (state, action) => {
      state.userList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [updateUserInfoSlice.rejected]: (state, action) => {
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