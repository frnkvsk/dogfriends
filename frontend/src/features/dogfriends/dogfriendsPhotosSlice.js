
import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsPhotosSlice = createSlice({
  name: 'photoList',
  initialState: {
    photoList: {
      status: 'idle',
      data: [],
      error: {}
    }
  },
  reducers: {
    addPhotoUrl: (state, action) => {
      state.photoList = {
        status: 'fulfilled',
        data: !state.photoList.data.some(post => post.photo_id === action.payload.photo_id) ?
          [...state.photoList.data, action.payload] : state.photoList.data,
        error: {}
      };
    }
  },
   
});

export const {
  addPhotoUrl,
} = dogfriendsPhotosSlice.actions;

export const selectPhotos = state => state.photoList.photoList;

export default dogfriendsPhotosSlice.reducer;
