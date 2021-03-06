import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api/';

const request = async (endpoint, paramsOrData = {}, verb = "get") => {  
  
  console.log("API Call:", endpoint, paramsOrData, verb, BASE_URL);
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
const postPostNew = async (data) => {
  return await request('posts/', data, 'post');
}
const putPostUpdate = async (id, title, body, username, token) => {  
  const data = {
    title,
    body,  
    username,
    _token: token  
  }
  return await request(`posts/${id}`, data, 'put');
}
const deletePost = async (id, username, token) => {
  const data = {
    id,
    username,
    _token: token  
  }
  return await request(`posts/${id}`, data, 'delete');
}

// replies
const getRepliesById = async (id) => {
  const res = await request(`replies/${id}`);
  return res;
}
const postReplyNew = async (data) => {
  request('replies/', data, 'post');
}

/**
 * User logs in to the system
 * @param {username, password} data 
 */
const login = async (data) => {
  try {
    return await request('login/', data, 'post');
  } catch (error) {
    console.error(error);
  }   
}

/**
 * Checks to see if username is already in use
 * @param {username} data 
 */
const preSignupUsernameCheck = async (data) => {
  try {
    const res = await request(`users/${data.username}`, {}, 'post');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const signup = async (data) => {   
  try {
    const res = await request('users/', data, 'post');
    return res;    
  } catch (error) {
    console.error(error);
  }   
}

/**
 * Get user information
 * @param {username, token} payload 
 */
const getUserInfo = async (payload) => {
  const {username, token} = payload;
  try {  
    return await request(`users/${username}/`, {_token: token}); 
  } catch (error) {
    console.error(error);
  }   
}

/**
 * getInitInfo gets aws endpoints for uploading and 
 * downloading images
 */
const getInitInfo = async () => {
  return await request('initinfo/');
}

/**
 * 
 * @param {*} payload 
 * @returns 
 */
const patchUserInfo = async (payload) => {
  try {
    return await request(`users/${payload.username}`, payload, 'patch');
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
  preSignupUsernameCheck,
  signup,
  getUserInfo,
  patchUserInfo,
  getRepliesById,
  postReplyNew,
  getInitInfo
};