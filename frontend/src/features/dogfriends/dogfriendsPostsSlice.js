import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsPostsSlice = createSlice({
  name: 'postList',
  initialState: {
    postList: {
      status: 'idle',
      data: [],
      error: {}
    }
  },
  reducers: {
    addPosts: (state, action) => {
      state.postList = {
        status: 'fulfilled',
        data: action.payload
      }
    }
  },
});

export const {
  addPosts,
} = dogfriendsPostsSlice.actions;

export const selectPosts = state => state.postList.postList;

export default dogfriendsPostsSlice.reducer;