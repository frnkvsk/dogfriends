import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';

export default function useImageUrl(key) {
  const selectList = useSelector(selectPhotos);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const getImage = async () => { 
    if(key) {
      if( selectList.status === 'fulfilled' && [...selectList.data].some(post => key.startsWith(post.photo_id)) ) {
        const post = [...selectList.data].find(post => key.startsWith(post.photo_id));
        setImageUrl(post.imageUrl);
      } else {
        const res = await getPhotoBySrc(key);
        if(res && res.data.Body) {
          const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');
          setImageUrl(imageUrl); 
          let payload = {
            photo_id: key,
            imageUrl
          }
          dispatch(addPhotoUrl(payload));        
        }
      }
    }  
    
  }
  useEffect(() => {
    if(!imageUrl.length) {
      getImage();
    }
  });

  return imageUrl;
}