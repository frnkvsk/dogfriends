import { createSlice } from '@reduxjs/toolkit';

export const dogfriendsPageCountSlice = createSlice({
  name: 'pageCount',
  initialState: {
    pageCount: {
      pagesTotal: 0,
      pageCurr: 0,
    }    
  },
  reducers: {
    setPages: (state, action) => {
      state.pageCount = {
        pagesTotal: action.payload.pagesTotal,
        pageCurr: action.payload.pageCurr,
      }
    },    
  },
  
});

export const {
  setPages,
} = dogfriendsPageCountSlice.actions;

export const selectPageCount = state => state.pageCount.pageCount;

export default dogfriendsPageCountSlice.reducer;