import axios from 'axios';

const AWS_IMAGE_BUCKET_URL_BASE='https://dogfriends.s3-us-west-2.amazonaws.com/';
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
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      //   // 'Access-Control-Allow-Origin':'*'
      // }
      
      // headers: {'referrerPolicy': 'no-referrer-when-downgrade'}
      // headers: {'Access-Control-Allow-Origin':'*'}
                
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

const putNewPhoto = async (image, imageName, upload_base, _token) => { 
  try {
    const data = {
      image,
      imageName
    } 
    // upload photo to AWS S3 bucket   
    const res = await request(upload_base, JSON.stringify(data), 'put');
    if(await res) {
      // write image data to database photos table
      const data2 = {
        photo_id: imageName,
        photo_url: `${AWS_IMAGE_BUCKET_URL_BASE}${imageName}`,
        _token
      }
      await request(`${BASE_URL}photos/`, data2, 'post');
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
  deletePhoto,
  putNewPhoto
};