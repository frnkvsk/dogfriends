import axios from 'axios';

const BASE_URL = process.env.REACT_APP_CLOUDINARY_BASE_URL;

const request = async (endpoint, paramsOrData = {}, verb = 'get') => {

  console.debug('API Call:', endpoint, paramsOrData, verb);
  try {
    const res = await axios({
      method: verb,
      url: `${BASE_URL}${endpoint}`,
      [verb === "get" ? "params" : "data"]: paramsOrData});
    
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
const postNewPhoto = async (acceptedFiles) => {
  const url = process.env.REACT_APP_CLOUDINARY_BASE_URL+'upload';

  acceptedFiles.forEach(async (acceptedFile) => {
    const formData = new FormData();
    formData.append('file', acceptedFile);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const response = await request(url, formData, 'post');
    const data = await response.json();      
    return data;

    // for dev we will just return this url so we don't keep making calls to Cloudinary API
    // return "http://res.cloudinary.com/dsxlpdoea/image/upload/v1605993605/photo-1544568100-847a948585b9_evaw8c.jpg";

  });
}
const postDestroyPhoto = async (public_id, signature) => {
  //https://api.cloudinary.com/v1_1/demo/image/destroy -X POST --data 'public_id=sample&timestamp=173719931&api_key=436464676&signature=a788d68f86a6f868af'
  const data = {
    public_id: public_id,
    timestamp: Date.now(),
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    signature: signature
  }
  const url = process.env.REACT_APP_CLOUDINARY_BASE_URL+'image/destroy';

  const response = await request(url, data, 'post');
  const data = await response.json();      
  return data;

  // for dev we will just return this url so we don't keep making calls to Cloudinary API
  // return data 
}

export {
  postNewPhoto,
  postDestroyPhoto
}