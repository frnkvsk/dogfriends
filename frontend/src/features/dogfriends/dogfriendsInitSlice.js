import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getInitInfo,
  postInitInfo
} from './api/DogfriendsApi';


export const getInitInfoData = createAsyncThunk(
  'getInitInfo',
  async () => {
    const response = await getInitInfo();
    return response.data;
  }
);
export const postInitInfoData = createAsyncThunk(
  'postInitInfo',
  async (token) => {
    // console.log('dogfriendsInitSlice token',token)
    const response = await postInitInfo(token);
    return response.data;
  }
);
