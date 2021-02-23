import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPosts,
  getPostById,
  postPostNew,
  // putPostUpdate,
  // deletePost,
} from './api/DogfriendsApi';

/**
 * GET array of posts
 * returns { }
 */
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
      postPostNew(action.payload);
    },
    
    // editPost: (state, action) => {
    //   putPostUpdate(action.payload);
    // },
    // removePost: (state, action) => {
    //   deletePost(action.payload);
    // },
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
  addPostUrl,
  editPost,
  removePost,
} = dogfriendsPostsSlice.actions;

export const selectPosts = state => state.postList.postList;

export default dogfriendsPostsSlice.reducer;