import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api/';

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
const postPostNew = async (title, description, body, token) => {
  const data = {
    title: title,
    description: description,
    body: body, 
    _token: token   
  }
  return await request('posts/', data, 'post');
}
const putPostUpdate = async (id, title, description, body, username, token) => {
  
  const data = {
    title: title,
    description: description,
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

// comments
const getComments = async (id) => {
  return await request(`posts/comments/${id}`)
}
const postCommentNew = async (id, text, token) => {
  const res = await request(`posts/comments/${id}`, {text: text, _token: token}, 'post');
  return res
}
const putCommentUpdate = async (id, text, token) => {
  const res = await request(`posts/comments/${id}`, {text: text, _token: token}, 'put');
  return res
}
const deleteComment = async (id, username, token) => {
  return await request(`posts/comments/${id}`, {username: username, _token: token}, 'delete');
}

// login / signup
const login = async (username, password) => {
  try {
    return await request('login/', {username: username, password: password}, 'post');
  } catch (error) {
    console.error(error);
  }   
}
const signup = async (username, password, first_name, last_name, photo_url, email) => {
  try {
    return await request('users/', {
      username: username, 
      password: password, 
      first_name: first_name, 
      last_name: last_name, 
      photo_url: photo_url, 
      email: email}, 'post');
  } catch (error) {
    console.error(error);
  }   
}
const getUserInfo = async (token, username) => {
  try {
    return await request(`users/${username}/`, {_token: token});
  } catch (error) {
    console.error(error);
  }   
}
const patchUserInfo = async (token, userInfo) => {
  userInfo._token = token;
  try {
    return await request(`users/${userInfo.username}/`, userInfo, 'patch');
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
  getComments,
  postCommentNew,
  putCommentUpdate,
  deleteComment,
  login,
  signup,
  getUserInfo,
  patchUserInfo,
};