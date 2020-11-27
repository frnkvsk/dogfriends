import axios from 'axios';

const BASE_URL = process.env.REACT_APP_EXPRESS_BASE_URL;//'http://localhost:5000/api/';

const request = async (endpoint, paramsOrData = {}, verb = "get") => {  
  
  console.debug("API Call:", endpoint, paramsOrData, verb);
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
const postNewPhoto = async (url, formData, token) => {
  /* commented out for testing
  const response1 = await fetch(url, {method: 'post', body: formData});
  const data1 = await response1.json(); 
  // public_id, url, signature
  // insert (public_id, url, signature) into photos table
  const data2 = {
    public_id: data1.public_id,
    url: data1.url,
    signature: data1.signature,
    _token: token   
  }
  return await request('photos/', data2, 'post');
  */
  let response = {
    status: 200,
    data: {
      id: "01ddd810-5980-455e-ad24-4e127906eb8e",
      public_id: "photo-1605812276723-c31bb1a68285_fzrbhx",
      signature: "7fcad400b727a90e8ccf03ec687745e62dbfa909",
      url: "https://images.unsplash.com/photo-1606245131568-de9896c3fdea?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60",
      // url: "https://res.cloudinary.com/dsxlpdoea/image/upload/v1605813712/sample.jpg",
    }
  }
  return await response;
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
  return await response.json();

  // for dev we will just return this url so we don't keep making calls to Cloudinary API
  // return data 
}

export {
  postNewPhoto,
  postDestroyPhoto
}