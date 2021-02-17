// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//   getPosts,
//   postPostVote,
// } from './api/DogfriendsApi';


// export const getPostsData = createAsyncThunk(
//   'getVotes',
//   async () => {
//     const response = await getPosts();
//     return response.data;
//   }
// );

// export const dogfriendsVotesSlice = createSlice({
//   name: 'votesList',
//   initialState: {
//     votesList: {
//       status: 'idle',
//       data: [],
//       error: {}
//     }
//   },
//   reducers: {
//     vote: (state, action) => {
//       const {id, direction, token} = action.payload;
//       postPostVote(id, direction, token);
//     }
//   },
//   extraReducers: {
//     // get all posts
//     [getPostsData.pending]: (state, action) => {
//       state.votesList = {
//         status: 'pending',
//         data: {},
//         error: {}
//       };
//     },
//     [getPostsData.fulfilled]: (state, action) => {
//       state.votesList = {
//         status: 'fulfilled',
//         data: action.payload,
//         error: {}
//       };
//     },
//     [getPostsData.rejected]: (state, action) => {
//       state.votesList = {
//         status: 'rejected',
//         data: {},
//         error: action.payload,
//       };
//     }, 
//   }
// });

// export const {
//   vote,
// } = dogfriendsVotesSlice.actions;

// export const selectVotes = state => state.votesList.votesList;

// export default dogfriendsVotesSlice.reducer;