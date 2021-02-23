import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
// import { 
//   selectPosts,
//   addPostUrl, 
// } from '../dogfriendsPostsSlice';
import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';

export default function useImageUrl(key) {
  const selectList = useSelector(selectPhotos);
  const dispatch = useDispatch();
  console.log('useImageUrl selectList',selectList)
  console.log('useImageUrl key',key)
  if(!key.endsWith('.txt')) {
    key += '.txt';
  }
  const [imageUrl, setImageUrl] = useState(null);
  const getImage = async () => { 
    if(key) {
      if( selectList.status === 'fulfilled' && [...selectList.data].some(post => key.startsWith(post.photo_id)) ) {
        const post = [...selectList.data].find(post => key.startsWith(post.photo_id));
        setImageUrl(post.imageUrl);
      } else {
        const res = await getPhotoBySrc(key);
        console.log('useImageUrl res',res)
        if(res && res.data.Body) {
          const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
          setImageUrl(base64); 
          let payload = {
            photo_id: key,
            imageUrl: base64
          }
          dispatch(addPhotoUrl(payload));        
        }
      }
      console.log('-useImageUrl postData') 
    }  
    
  }
  useEffect(() => {
    if(!imageUrl) {
      getImage();
    }
  });

  return imageUrl;
}