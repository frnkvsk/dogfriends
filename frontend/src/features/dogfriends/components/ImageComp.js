import React, { useState, useEffect } from 'react';
import {getPhotoBySrc} from '../api/DogfriendsPhotosApi';

export default function ImageComp(key) {
  console.log('ImageComp key',key)
  const [imageUrl, setImageUrl] = useState(null);
  const getImage = async () => { 
    if(key) {
      const res = await getPhotoBySrc(key);
      if(res && res.status === 200) {
        console.log('ImageComp getImage res',res)
        const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
        setImageUrl(base64);
      } 
    }     
       
  }
  useEffect(() => {
    if(!imageUrl) {
      getImage();
      console.log('ImageComp useEffect imageUrl',imageUrl)
    }
  });

  return (
    <img src={imageUrl} alt='df' />
  );
}
