import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getRepliesById,
  postReplyNew
} from './api/DogfriendsApi';

export const getRepliesDataById = createAsyncThunk(
  'getRepliesById',
  async (id) => {
    const res = await getRepliesById(id);
    console.log('dogfriendsRepliesSlice res',res)
    return res.data;
  }
);
// export const addNewReply = createAsyncThunk(
//   'addNewReply',
//   async (data) => {
//     const res = await getRepliesById(data);
//     console.log('dogfriendsRepliesSlice res',res)
//     return res.data;
//   }
// );
// const addNewReplyHelper = data => {
//   postReplyNew(data);
//   console.log('dogfriendsRepliesSlice reducers addNewReply')
// }
export const dogfriendsRepliesSlice = createSlice({
  name: 'replyList',
  initialState: {
    replyList: {
      status: 'idle',
      data: [],
      error: {}
    }
  },
  reducers: {
    addNewReply: (state, action) => {
      postReplyNew(action.payload);
      // addNewReplyHelper(action.payload);
      // state.replyList.data.push(action.payload);
    },
    
  },
  extraReducers: {
    // get all replies by parent_id
    [getRepliesDataById.pending]: (state, action) => {
      state.replyList = {
        status: 'pending',
        data: {},
        error: {}
      };
    },
    [getRepliesDataById.fulfilled]: (state, action) => {
      state.replyList = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    },
    [getRepliesDataById.rejected]: (state, action) => {
      state.replyList = {
        status: 'rejected',
        data: {},
        error: action.payload,
      };
    },
      
  }
});

export const {
  addNewReply,
} = dogfriendsRepliesSlice.actions;

export const selectReplies = state => state.replyList.replyList;

export default dogfriendsRepliesSlice.reducer;