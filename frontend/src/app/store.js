import { configureStore } from '@reduxjs/toolkit';
import dogfriendsPageCountSlice from '../features/dogfriends/dogfriendsPageCountSlice';
import dogfriendsPostsSlice from '../features/dogfriends/dogfriendsPostsSlice';
import dogfriendsRepliesSlice from '../features/dogfriends/dogfriendsRepliesSlice';
import dogfriendsUserSlice from '../features/dogfriends/dogfriendsUserSlice';
import dogfriendsPhotosSlice from '../features/dogfriends/dogfriendsPhotosSlice';
import dogfriendsAvatarSlice from '../features/dogfriends/dogfriendsAvatarSlice';
import dogfriendsInitInfoSlice from '../features/dogfriends/dogfriendsInitInfoSlice';

export default configureStore({
  reducer: {
    postList: dogfriendsPostsSlice,
    replyList: dogfriendsRepliesSlice,
    pageCount: dogfriendsPageCountSlice,
    userInfo: dogfriendsUserSlice,
    photoList: dogfriendsPhotosSlice,
    avatarUrl: dogfriendsAvatarSlice,
    initInfo: dogfriendsInitInfoSlice
  },
});
