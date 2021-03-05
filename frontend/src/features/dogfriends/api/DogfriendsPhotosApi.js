import axios from 'axios';

// const AWS_IMAGE_BUCKET_URL_BASE='https://dogfriends.s3-us-west-2.amazonaws.com/';
const BASE_URL = 'http://localhost:5000/api/';

const request = async (endpoint, paramsOrData = {}, verb = "get") => {    
  console.log("API Call:", endpoint, paramsOrData, verb);
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');//multipart/form-data
  headers.append('Accept', 'application/json');

  headers.append('GET', 'POST', 'PUT', 'OPTIONS');
  try {
    const res = await axios({
      method: verb,
      url: endpoint,
      [verb === "get" ? "params" : "data"]: paramsOrData,
      headers: headers
                
    });
    
    return res;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
  }catch(err) {
    let message = err.response ? err.response.data.message : err;
    throw Array.isArray(message) ? message : [message];
  }
}

// photos
const getPhotos = async () => {
  // let res = await request('posts');
  // return res;
}
const getPhotoById = async () => {
  // return await request('https://dogfriends.s3-us-west-2.amazonaws.com/79abc5f5-514e-40b2-88a4-d7b37bd930fd.txt');
  
}

// gets Base 64 image/jpeg string from AWS S3 bucket
// return Buffer
const getPhotoBySrc = async (key, lambdaUrl) => {  
  return await request(lambdaUrl, {key}, 'post');
}

// puts Base 64 image/jpeg string into AWS S3 bucket
// posts image id and url to database
const putNewPhoto = async (image, imageName, aws_endpoint_up, _token, aws_endpoint_down) => { 
  // if(!imageName.endsWith('.txt')) imageName = `${imageName}.txt`;
  try {
    // upload photo to AWS S3 bucket   
    const res = await request(aws_endpoint_up, {image, imageName}, 'put');
    if(await res) {
      // write image data to database photos table
      const data = {
        photo_id: imageName,
        photo_url: `${aws_endpoint_down}/${imageName}`,
        _token
      }
      await request(`${BASE_URL}photos/`, data, 'post');
    }
  } catch (error) {
    console.log(error);
  }
  
}

const deletePhoto = async (id, username, token) => {
  const data = {
    id: id,
    username: username,
    _token: token  
  }
  return await request(`posts/${id}`, data, 'delete');
}

export {
  getPhotos,
  getPhotoById,
  getPhotoBySrc,
  deletePhoto,
  putNewPhoto
};