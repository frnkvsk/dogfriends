
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//   postNewPhoto,
//   // postDestroyPhoto
// } from './api/DogfriendsPhotosApi';

// export const postPhotoNew = createAsyncThunk(
//   'postNewPhoto',
//   async (url, formData) => {
//     const response = await postNewPhoto(url, formData);
//     return response.data;
//   }
// );
// // export const postPhotoDestroy = createAsyncThunk(
// //   'postPhotoDestroy',
// //   async (public_id, signature) => {
// //     const response = await postDestroyPhoto(public_id, signature);
// //     return response.data;
// //   }
// // );

// // export const getPhotoById = createAsyncThunk(
// //   'getPhotoById',
// //   async (id) => {
// //     const response = await getPhotoById(id);
// //     return response.data;
// //   }
// // );

// export const dogfriendsPhotosSlice = createSlice({
//   name: 'photoList',
//   initialState: {
//     photoList: {
//       status: 'idle',
//       data: [],
//       error: {}
//     }
//   },
//   // reducers: {
//   //   removePhoto: (state, action) => {
//   //     deletePhoto(action.payload.id, action.payload.username, action.payload.token);
//   //   },
//   // },
//   extraReducers: {
//     // post a new photo
//     [postNewPhoto.pending]: (state, action) => {
//       state.photoList = {
//         status: 'pending',
//         data: {},
//         error: {}
//       };
//     },
//     [postNewPhoto.fulfilled]: (state, action) => {
//       state.photoList = {
//         status: 'fulfilled',
//         data: action.payload,
//         error: {}
//       };
//     },
//     [postNewPhoto.rejected]: (state, action) => {
//       state.photoList = {
//         status: 'rejected',
//         data: {},
//         error: action.payload,
//       };
//     },    
//     // delete a photo
//     // [postPhotoDestroy.pending]: (state, action) => {
//     //   state.photoList = {
//     //     status: 'pending',
//     //     data: {},
//     //     error: {}
//     //   };
//     // },
//     // [postPhotoDestroy.fulfilled]: (state, action) => {
//     //   state.photoList = {
//     //     status: 'fulfilled',
//     //     data: action.payload,
//     //     error: {}
//     //   };
//     // },
//     // [postPhotoDestroy.rejected]: (state, action) => {
//     //   state.photoList = {
//     //     status: 'rejected',
//     //     data: {},
//     //     error: action.payload,
//     //   };
//     // },    
//   }
// });

// // export const {
// //   deletePhoto,
// // } = dogfriendsPhotosSlice.actions;

// export const selectPosts = state => state.photoList.photoList;

// export default dogfriendsPhotosSlice.reducer;
