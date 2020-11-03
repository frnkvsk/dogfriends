import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getComments,
  postCommentNew,
  deleteComment,
} from './api/DogfriendsApi';

export const getCommentsDataById = createAsyncThunk(
  'getCommentsById',
  async (id) => {
    const response = await getComments(id);
    return response.data;
  }
);

export const dogfriendsCommentsSlice = createSlice({
  name: 'commentList',
  initialState: {
    commentList: {
      status: 'idle',
      data: [],
      error: {}
    }
  },
  reducers: {
    addNewComment: (state, action) => {
      const {id, comment, token} = action.payload;
      postCommentNew(id, comment, token);
    },
    removeComment: (state, action) => {
      const {id, username, token} = action.payload;
      deleteComment(id, username, token);
    },    
  },
  extraReducers: {    
    // get comments by id
    [getCommentsDataById.pending]: (state, action) => {
      state.commentList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getCommentsDataById.fulfilled]: (state, action) => {
      state.commentList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getCommentsDataById.rejected]: (state, action) => {
      state.commentList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    },    
  }
});

export const {
  addNewComment,
  removeComment,
} = dogfriendsCommentsSlice.actions;

export const selectComments = state => state.commentList.commentList;

export default dogfriendsCommentsSlice.reducer;