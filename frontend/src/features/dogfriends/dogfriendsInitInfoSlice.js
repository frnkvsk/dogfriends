import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsInitInfoSlice = createSlice({
  name: 'initInfo',
  initialState: {
    initInfo: {
      status: 'idle',
      data: {},
      error: {}
    }
  },
  reducers: {
    addInitInfo: (state, action) => {
      state.initInfo = {
        status: 'fulfilled',
        data: action.payload
      }
    }
  },
});

export const {
  addInitInfo
} = dogfriendsInitInfoSlice.actions;

export const selectInitInfo = state => state.initInfo.initInfo;

export default dogfriendsInitInfoSlice.reducer;