// /**
//  * usePosts 
//  * Inputs an index range (fromIndex, toIndex). 
//  * Uses the range to get an array of photo_id.
//  * Traverses through photo_id array:
//  *    * verify Redux selectPhotos list - if photo_id is present 
//  *    * verify Redux selectPhotos list - if imageUrl is present 
//  *    * update Redux selectPhotos - photo_id and imageUrl as needed 
//  * 
//  * @param {Number} fromIndex - lower index
//  * @param {Number} toIndex - upper index (inclusive)
//  * @returns ???
//  */

// import {useEffect, useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
// import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';
// import { addPosts, selectPosts } from '../dogfriendsPostsSlice';
// import useImageUrl from './useImageUrl';

// export default function usePosts(fromIndex, toIndex) {
//   const selectPhotosList = useSelector(selectPhotos);
//   const selectPostsList = useSelector(selectPosts);
//   const dispatch = useDispatch();
//   const [imageUrl, setImageUrl] = useState('');
//   const urlList = [];
//   useEffect(() => {
//     // const getImageUrl = async (photo_id) => {
//     //   urlList.push(useImageUrl(photo_id));
//     // }
//     try {
//       for(let {photo_id} of selectPostsList.data.slice(fromIndex, toIndex)) {
        
//         const url = useImageUrl(photo_id)
//         console.log(url.slice(0, 20))
//       }
      
//     } catch (error) {
      
//     }
    
//     console.log('usePost useEffect getImageUrl ',selectPostsList)
//   }, [selectPostsList.status]);

//   // const getImage = async () => { 
//   //   if(key) {
//   //     if( selectList.status === 'fulfilled' && [...selectList.data].some(post => key.startsWith(post.photo_id)) ) {
//   //       const post = [...selectList.data].find(post => key.startsWith(post.photo_id));
//   //       setImageUrl(post.imageUrl);
//   //     } else {
//   //       const res = await getPhotoBySrc(key);
//   //       if(res && res.data.Body) {
//   //         const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');
//   //         setImageUrl(imageUrl); 
//   //         let payload = {
//   //           photo_id: key,
//   //           imageUrl
//   //         }
//   //         dispatch(addPhotoUrl(payload));        
//   //       }
//   //     }
//   //   }  
    
//   // }
//   // useEffect(() => {
//   //   if(!imageUrl.length) {
//   //     getImage();
//   //   }
//   // });

//   return null;
// }