/**
 * useImageUrl 
 * Inputs a photo_id, uses the id as a key to an AWS bucket, which returns
 * a buffer of image data, then converts the buffer to base64 string to be
 * consumed as a image url source.
 * 
 * @param {String} photo_id 
 * @returns {String} base64 string url
 */

import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';

export default function useImageUrl(photo_id) {
  const selectList = useSelector(selectPhotos);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const getImage = async () => { 
    if(photo_id) {
      if( selectList.status === 'fulfilled' && [...selectList.data].some(post => photo_id.startsWith(post.photo_id)) ) {
        const post = [...selectList.data].find(post => photo_id.startsWith(post.photo_id));
        setImageUrl(post.imageUrl);
      } else {
        const res = await getPhotoBySrc(photo_id);
        if(res && res.data.Body) {
          const imageUrl = String.fromCharCode(...res.data.Body.data).toString('base64');
          setImageUrl(imageUrl); 
          let payload = {
            photo_id: photo_id,
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