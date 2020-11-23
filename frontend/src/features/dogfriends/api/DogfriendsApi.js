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
// posts
const getPosts = async () => {
  let res = await request('posts');
  return res;
}
const getPostById = async (id) => {
  return await request(`posts/${id}`);
}
const postPostVote = async (id, direction, token) => {
  return await request(`posts/${id}/vote/${direction}`, {_token: token}, 'post');
}
const postPostNew = async (title, parent_id, photo_id, body, token) => {
  const data = {
    title: title,
    parent_id: parent_id, 
    photo_id: photo_id, 
    body: body, 
    _token: token   
  }
  return await request('posts/', data, 'post');
}
const putPostUpdate = async (id, title, body, username, token) => {
  
  const data = {
    title: title,
    body: body,  
    username: username,
    _token: token  
  }
  return await request(`posts/${id}`, data, 'put');
}
const deletePost = async (id, username, token) => {
  const data = {
    id: id,
    username: username,
    _token: token  
  }
  return await request(`posts/${id}`, data, 'delete');
}

// login / signup
const login = async (username, password) => {
  try {
    return await request('login/', {username: username, password: password}, 'post');
  } catch (error) {
    console.error(error);
  }   
}

const signup = async ({username, 
                      password, 
                      first_name, 
                      last_name, 
                      email, 
                      photo_url, 
                      city, 
                      state, 
                      country}) => {
                        
  try {
    const res = await request('users/', {
      username: username, 
      password: password, 
      first_name: first_name, 
      last_name: last_name, 
      email: email,
      photo_id: null,
      admin: false, 
      city: city, 
      state: state, 
      country: country, 
      }, 'post');
    
    // if a photo_url is provided during registration
    //  1. add a new photo to the photos table
    //  2. patch user table to show photo_id of the new photo
    if(photo_url.length) {
      const photoInfo = await postPhotoNew(res.data.token, photo_url, username);
      const data = {
        username: username, 
        password: password, 
        first_name: first_name, 
        last_name: last_name, 
        email: email,
        photo_id: photoInfo.data.id,
        city: city, 
        state: state, 
        country: country,
        _token: res.data.token
      }

      await request(`users/${username}`, data, 'patch');
    }
    return res;
  } catch (error) {
    console.error(error);
  }   
}
const getUserInfo = async (payload) => {
  const {username, token} = payload;
  let photo_url = null;
  try {  
    const res = await request(`users/${username}/`, {_token: token});
    if(res.data.user.photo_id) {
      // console.log('DogfriendsApi getUserInfo res.data.user.photo_id',res.data.user.photo_id)
      const resp = await request(`photos/${res.data.user.photo_id}`);
      photo_url = resp.data[0].url;
    
    }
    res.data.user.photo_url = photo_url;
    // console.log('DogfriendsApi getUserInfo res',res)
    return res;
  } catch (error) {
    console.error(error);
  }   
}
const patchUserInfo = async (token, userInfo) => {
  userInfo._token = token;
  let photo_id = null;
  if(userInfo.photo_url) {
    photo_id = await postPhotoNew(token, userInfo.photo_url, userInfo.username);
  }
  delete userInfo.photo_url;
  userInfo.photo_id = photo_id.data.id;
  try {
    return await request(`users/${userInfo.username}`, userInfo, 'patch');
  } catch (error) {
    console.error(error);
  }   
}

export {
  getPosts,
  getPostById,
  postPostVote,
  postPostNew,
  putPostUpdate,
  deletePost,
  login,
  signup,
  getUserInfo,
  patchUserInfo,
};