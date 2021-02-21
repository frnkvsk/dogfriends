import { configureStore } from '@reduxjs/toolkit';
import dogfriendsPageCountSlice from '../features/dogfriends/dogfriendsPageCountSlice';
import dogfriendsPostsSlice from '../features/dogfriends/dogfriendsPostsSlice';
import dogfriendsRepliesSlice from '../features/dogfriends/dogfriendsRepliesSlice';
import dogfriendsVotesSlice from '../features/dogfriends/dogfriendsVotesSlice';
import dogfriendsUserSlice from '../features/dogfriends/dogfriendsUserSlice';
import dogfriendsPhotosSlice from '../features/dogfriends/dogfriendsPhotosSlice';

export default configureStore({
  reducer: {
    postList: dogfriendsPostsSlice,
    replyList: dogfriendsRepliesSlice,
    votesList: dogfriendsVotesSlice,
    pageCount: dogfriendsPageCountSlice,
    userList: dogfriendsUserSlice,
    photosList: dogfriendsPhotosSlice,
  },
});
