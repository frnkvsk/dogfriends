import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPosts,
  getPostById,
  postPostNew,
  putPostUpdate,
  deletePost,
} from './api/DogfriendsApi';

export const getPostsData = createAsyncThunk(
  'getPosts',
  async () => {
    const response = await getPosts();
    return response.data;
  }
);

export const getPostDataById = createAsyncThunk(
  'getPostById',
  async (id) => {
    const response = await getPostById(id);
    return response.data;
  }
);

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
    addNewPost: (state, action) => {
      const {title, parent_id, photo_id, body, token} = action.payload;
      postPostNew(title, parent_id, photo_id, body, token);
    },
    editPost: (state, action) => {
      const {id, title, body, username, token} = action.payload;
      putPostUpdate(id, title, body, username, token);
    },
    removePost: (state, action) => {
      deletePost(action.payload.id, action.payload.username, action.payload.token);
    },
  },
  extraReducers: {
    // get all posts
    [getPostsData.pending]: (state, action) => {
      state.postList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getPostsData.fulfilled]: (state, action) => {
      state.postList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getPostsData.rejected]: (state, action) => {
      state.postList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    },
    // get post by id
    [getPostDataById.pending]: (state, action) => {
      state.postList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getPostDataById.fulfilled]: (state, action) => {
      state.postList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getPostDataById.rejected]: (state, action) => {
      state.postList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    },    
  }
});

export const {
  addNewPost,
  editPost,
  removePost,
} = dogfriendsPostsSlice.actions;

export const selectPosts = state => state.postList.postList;

export default dogfriendsPostsSlice.reducer;