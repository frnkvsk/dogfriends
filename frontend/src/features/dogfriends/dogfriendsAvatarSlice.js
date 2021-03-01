import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsAvatarSlice = createSlice({
  name: 'avatarUrl',
  initialState: {
    avatarUrl: {
      status: 'idle',
      data: {},
      error: {}
    }
  },
  reducers: {
    addAvatarUrl: (state, action) => {
      state.avatarUrl = {
        status: 'fulfilled',
        data: action.payload,
        error: {}
      };
    }
  },
   
});

export const {
  addAvatarUrl,
} = dogfriendsAvatarSlice.actions;

export const selectAvatar = state => state.avatarUrl.avatarUrl;

export default dogfriendsAvatarSlice.reducer;
