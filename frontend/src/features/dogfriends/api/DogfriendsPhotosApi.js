// import axios from 'axios';

// // const BASE_URL = 'https://app-dogfriends.herokuapp.com/api/';
// const BASE_URL = 'http://localhost:5000/api/';

// const request = async (endpoint, paramsOrData = {}, verb = "get") => {    
//   // console.debug("API Call:", endpoint, paramsOrData, verb);
//   let headers = new Headers();
//   headers.append('Content-Type', 'application/json');
//   headers.append('Accept', 'application/json');
//   headers.append('GET', 'POST', 'PUT', 'OPTIONS');
//   try {
//     const res = await axios({
//       method: verb,
//       url: endpoint,
//       [verb === "get" ? "params" : "data"]: paramsOrData,
//       headers: headers                
//     });
    
//     return res;
//       // axios sends query string data via the "params" key,
//       // and request body data via the "data" key,
//       // so the key we need depends on the HTTP verb
//   }catch(err) {
//     let message = err.response ? err.response.data.message : err;
//     throw Array.isArray(message) ? message : [message];
//   }
// }

// // photos
// // gets Base 64 image/jpeg string from AWS S3 bucket
// // return Buffer
// const getPhotoBySrc = async (key, lambdaUrl) => {  
//   return await request(lambdaUrl, {key}, 'post');
// }

// // puts Base 64 image/jpeg string into AWS S3 bucket
// // posts image id and url to database
// const putNewPhoto = async (image, imageName, aws_endpoint_up, _token, aws_endpoint_down) => { 
  
//   try {
//     // upload photo to AWS S3 bucket   
//     const res = await request(aws_endpoint_up, {image, imageName}, 'put');
//     if(await res) {
//       // write image data to database photos table
//       const data = {
//         photo_id: imageName,
//         photo_url: `${aws_endpoint_down}/${imageName}`,
//         _token
//       }
//       await request(`${BASE_URL}photos/`, data, 'post');
//     }
//   } catch (error) {
//     console.error(error);
//   }
  
// }

// const deletePhoto = async (id, username, token) => {
//   const data = {
//     id: id,
//     username: username,
//     _token: token  
//   }
//   return await request(`${BASE_URL}posts/${id}`, data, 'delete');
// }

// export {
//   getPhotoBySrc,
//   deletePhoto,
//   putNewPhoto
// };