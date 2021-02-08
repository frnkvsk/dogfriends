import axios from 'axios';


const request = async (endpoint, paramsOrData = {}, verb = "get") => {    
  
  try {
    const res = await axios({
      method: verb,
      url: endpoint,
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
const getPhotos = async () => {
  let res = await request('posts');
  return res;
}
const getPhotoById = async (id) => {
  return await request(`posts/${id}`);
}
const putNewPhoto = async (blob, photo_id, upload_base) => {
  let fileReader = new FileReader();
  let image;
  fileReader.readAsArrayBuffer(blob);

  fileReader.onload = function(event) {
    image = fileReader.result;
  };
  const body = {
    "image": JSON.stringify(image),
    "imageName": photo_id
  }
  return await request(upload_base, body, 'put');
}
// const postNewPhoto = async (title, parent_id, photo_id, body, token) => {
//   const data = {
//     title: title,
//     parent_id: parent_id, 
//     photo_id: photo_id, 
//     body: body, 
//     _token: token   
//   }
//   return await request('posts/', data, 'post');
// }
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