import { configureStore } from '@reduxjs/toolkit';
import dogfriendsPageCountSlice from '../features/dogfriends/dogfriendsPageCountSlice';
import dogfriendsPostsSlice from '../features/dogfriends/dogfriendsPostsSlice';
import dogfriendsVotesSlice from '../features/dogfriends/dogfriendsVotesSlice';
import dogfriendsUserSlice from '../features/dogfriends/dogfriendsUserSlice';

export default configureStore({
  reducer: {
    postList: dogfriendsPostsSlice,
    votesList: dogfriendsVotesSlice,
    pageCount: dogfriendsPageCountSlice,
    userList: dogfriendsUserSlice,
  },
});
