import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserInfo
} from './api/DogfriendsApi';


export const getUserInfoData = createAsyncThunk(
  'getVotes',
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
      data: [],
      error: {}
    }
  },
  extraReducers: {
    // get user info
    [getUserInfoData.pending]: (state, action) => {
      state.userList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getUserInfoData.fulfilled]: (state, action) => {
      state.userList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getUserInfoData.rejected]: (state, action) => {
      state.userList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    }, 
  }
});


export const selectUser = state => state.userList.userList;

export default dogfriendsUserSlice.reducer;