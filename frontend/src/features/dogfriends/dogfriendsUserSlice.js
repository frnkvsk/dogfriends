import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsUserSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfo: {
      status: 'idle',
      data: {},
      error: {}
    }
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = {
        status: 'fulfilled',
        data: action.payload
      }
    }
    // logout: (state, action) => {
    //   state.userList = action.payload;
    // },
    // setUserList: (state, action) => {
    //   state.userList = action.payload;
    // },
  },
});

export const {
  addUserInfo
  // logout,
} = dogfriendsUserSlice.actions;

export const selectUser = state => state.userInfo.userInfo;

export default dogfriendsUserSlice.reducer;