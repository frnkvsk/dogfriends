import axios from 'axios';


// const BASE_URL = 'https://app-dogfriends.herokuapp.com/api/';
const BASE_URL = 'http://localhost:5000/api/';

const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('GET', 'POST', 'PUT', 'OPTIONS');

// get all posts
const getPosts = async () => {
  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}posts`, 
    headers: headers
  });
  return response;
}

// add new post
const postPostNew = async (data) => {
  const response = await axios({
    method: 'POST',
    url: `${BASE_URL}posts`, 
    data,
    headers: headers
  });
  return response;
}

// get replies to a post by post_id
const getRepliesById = async (id) => {
  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}replies/${id}`,
    headers: headers
  });
  return response;
}
const postReplyNew = async (data) => {
  const response = await axios({
    method: 'POST',
    url: `${BASE_URL}replies`,
    data,
    headers: headers
  });
  return response;
}

/**
 * User logs in to the system
 * @param {username, password} data 
 */
const login = async (data) => {
  
  return await axios({
      method: 'POST',
      url: `${BASE_URL}${login}`,      
      data,
      headers: headers
    });
  //   console.log('DogfriendsApi login response',response)
  //   return response;
  // } catch (error) {
  //   return error;
  // }   
}

/**
 * Checks to see if username is already in use
 * @param {username} data 
 */
const preSignupUsernameCheck = async (data) => {
  // try {
  //   const response = await axios({
  //     method: 'POST',
  //     url: `${BASE_URL}users/${data.username}`,
  //     data,
  //     headers: headers
  //   });
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }
  return await axios({
    method: 'POST',
    url: `${BASE_URL}users/${data.username}`,
    data,
    headers: headers
  });
}

const signup = async (data) => {   
  // try {
  //   const response = await axios({
  //     method: 'POST',
  //     url: `${BASE_URL}users`,
  //     data,
  //     headers: headers
  //   });
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // } 
  return await axios({
    method: 'POST',
    url: `${BASE_URL}users`,
    data,
    headers: headers
  });  
}

/**
 * Get user information
 * @param {username, token} data 
 */
const getUserInfo = async (data) => {
  const {username, token} = data;
  return await axios({
    method: 'GET',
    url: `${BASE_URL}users/${username}`,
    data: {_token: token},
    headers: headers
  });
  // try {  
  //   const response = await axios({
  //     method: 'GET',
  //     url: `${BASE_URL}users/${username}`,
  //     data: {_token: token},
  //     headers: headers
  //   });
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }   
}

/**
 * getInitInfo gets aws endpoints for uploading and 
 * downloading images
 */
const getInitInfo = async () => {
  // try {
  //   const response = await axios({
  //     method: 'GET',
  //     url: `${BASE_URL}initinfo`,
  //     headers: headers
  //   });
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }  
  return await axios({
    method: 'GET',
    url: `${BASE_URL}initinfo`,
    headers: headers
  });  
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
const patchUserInfo = async (data) => {
  // try {
  //   const response = await axios({
  //     method: 'PATCH',
  //     url: `${BASE_URL}users/${username}`,
  //     data,
  //     headers: headers
  //   });
  //   return response;
  // } catch (error) {
  //   console.error(error);
  // }  
  return await axios({
    method: 'PATCH',
    url: `${BASE_URL}users/${data.username}`,
    data,
    headers: headers
  }); 
}

export {
  getPosts,
  // getPostById,
  // postPostVote,
  postPostNew,
  // putPostUpdate,
  // deletePost,
  login,
  preSignupUsernameCheck,
  signup,
  getUserInfo,
  patchUserInfo,
  getRepliesById,
  postReplyNew,
  getInitInfo
};