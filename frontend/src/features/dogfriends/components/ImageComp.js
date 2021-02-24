// import {useEffect, useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getPhotoBySrc } from '../api/DogfriendsPhotosApi';
// import { addPhotoUrl, selectPhotos } from '../dogfriendsPhotosSlice';
// import CircularProgress from '@material-ui/core/CircularProgress';

// export default function ImageComp({id}) {
//   const selectList = useSelector(selectPhotos);
//   const dispatch = useDispatch();
//   if(!id.endsWith('.txt')) {
//     id += '.txt';
//   }
//   const [imageUrl, setImageUrl] = useState(null);
//   const getImage = async () => { 
//     if(id) {
//       if( selectList.status === 'fulfilled' && [...selectList.data].some(post => id.startsWith(post.photo_id)) ) {
//         const post = [...selectList.data].find(post => id.startsWith(post.photo_id));
//         setImageUrl(post.imageUrl);
//       } else {
//         const res = await getPhotoBySrc(id);
//         if(res && res.data.Body) {
//           const base64 = String.fromCharCode(...res.data.Body.data).toString('base64');
//           setImageUrl(base64); 
//           let payload = {
//             photo_id: id,
//             imageUrl: base64
//           }
//           dispatch(addPhotoUrl(payload));        
//         }
//       }
//     }  
    
//   }
//   useEffect(() => {
//     if(!imageUrl) {
//       getImage();
//     }
//   });

//   return (
//     <>
//     {imageUrl ? 
//       <img src={imageUrl} alt='dd' /> : 
//       <CircularProgress />}
//     </>
//   );
// }