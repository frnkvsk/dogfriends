import { configureStore } from '@reduxjs/toolkit';
import dogfriendsCommentsSlice from '../features/dogfriends/dogfriendsCommentsSlice';
import dogfriendsPageCountSlice from '../features/dogfriends/dogfriendsPageCountSlice';
import dogfriendsPostsSlice from '../features/dogfriends/dogfriendsPostsSlice';
import dogfriendsVotesSlice from '../features/dogfriends/dogfriendsVotesSlice';

export default configureStore({
  reducer: {
    postList: dogfriendsPostsSlice,
    commentList: dogfriendsCommentsSlice,
    votesList: dogfriendsVotesSlice,
    pageCount: dogfriendsPageCountSlice,
  },
});
