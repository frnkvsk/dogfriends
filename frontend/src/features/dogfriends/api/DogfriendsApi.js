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
const login = async (data) => {
  // console.log('DogfriendsApi login data',data)
  try {
    return await request('login/', data, 'post');
  } catch (error) {
    console.error(error);
  }   
}

const preSignupUsernameCheck = async ({username}) => {
  try {
    // console.log('DogfriendsApi preSignupUsernameCheck username',username)
    const res = await request(`users/${username}`, {}, 'post');
    // console.log('--DogfriendsApi preSignupUsernameCheck res',res.data)
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const signup = async (
  // {username, 
  //                     password, 
  //                     first_name, 
  //                     last_name, 
  //                     email, 
  //                     photo_id, 
  //                     city, 
  //                     state, 
  //                     country}
                      
                      data) => {
       console.log('DogfriendsApi signup',data)
      //  username, 
      //  password, 
      //  first_name, 
      //  last_name, 
      //  email, 
      //  photo_id, 
      //  city, 
      //  state, 
      //  country)                 
  try {
    const res = await request('users/', 
    // {
    //   username: username, 
    //   password: password, 
    //   first_name: first_name, 
    //   last_name: last_name, 
    //   email: email,
    //   photo_id: photo_id,
    //   admin: false, 
    //   city: city, 
    //   state: state, 
    //   country: country, 
    //   }, 
      data,'post');
      console.log('DogfriendsApi signup res',res)
    return res;    
  } catch (error) {
    console.error(error);
  }   
}
const getUserInfo = async (payload) => {
  // console.log('DogfriendsApi payload',payload)
  const {username, token} = payload;
  let photo_url = null;
  try {  
    const res = await request(`users/${username}/`, {_token: token});
    // console.log('DogfriendsApi getUserInfo 0res',res)
    if(res.data.user.photo_id) {
      // console.log('DogfriendsApi getUserInfo res.data.user.photo_id',res.data.user.photo_id)
      const resp = await request(`photos/${res.data.user.photo_id}`);
      // console.log('DogfriendsApi getUserInfo 0resp',resp)
      photo_url = resp.data.url;
    
    }
    res.data.user.photo_url = photo_url;
    // console.log('DogfriendsApi getUserInfo 1res',res)
    return res;
  } catch (error) {
    // console.log('Error getUserInfo')
    console.error(error);
  }   
}
const patchUserInfo = async (userInfo) => {
  // console.log('DogfriendsApi patchUserInfo userInfo',userInfo)
  // userInfo._token = token;
  // let photo_id = null;
  // if(userInfo.photo_url) {
  //   photo_id = await postPhotoNew(token, userInfo.photo_url, userInfo.username);
  // }
  // delete userInfo.photo_url;
  // userInfo.photo_id = photo_id.data.id;
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
  preSignupUsernameCheck,
  signup,
  getUserInfo,
  patchUserInfo,
};