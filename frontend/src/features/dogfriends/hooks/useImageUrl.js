import {useEffect, useState} from 'react';
import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';

export default function useImageUrl(key) {
  if(!key.endsWith('.txt')) {
    key += '.txt';
  }
  const [imageUrl, setImageUrl] = useState(null);
  const getImage = async () => { 
    if(key) {
      const res = await getPhotoBySrc(key);
      if(res && res.status === 200) {
        const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
        setImageUrl(base64);
      } 
    }     
       
  }
  useEffect(() => {
    if(!imageUrl) {
      getImage();
    }
  });

  return imageUrl;
}