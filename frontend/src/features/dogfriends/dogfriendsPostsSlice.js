import { createSlice } from '@reduxjs/toolkit';


/**
 * GET array of posts
 * returns { }
 */
// export const getPostsData = createAsyncThunk(
//   'getPosts',
//   async () => {
//     const response = await getPosts();
//     return response.data;
//   }
// );

// export const getPostDataById = createAsyncThunk(
//   'getPostById',
//   async (id) => {
//     const response = await getPostById(id);
//     return response.data;
//   }
// );

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