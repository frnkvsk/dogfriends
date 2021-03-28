import axios from 'axios';


// const BASE_URL = 'https://app-dogfriends.herokuapp.com/api/';
const BASE_URL = 'http://localhost:5000/api/';

const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('GET', 'POST', 'PUT', 'OPTIONS');

/**
 * Gets all posts
 *
 * @params None
 * 
 * @returns () => [ 
 *                  { id, title, body, replies, votes, created_on, username,},
 *                  ...
 *                ]
 * 
 * @usedby PostList
 * 
 */
const getPosts = async () => {
  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}posts`, 
    headers: headers
  });
  return response;
}

/**
 * add a new post    
 *
 * @params { data: { title, body, username, photo_id } }
 * 
 * @returns { id, title, body, username }
 * 
 * @usedby PostFormNew
 * 
 */
const postPostNew = async (data) => {
  const response = await axios({
    method: 'POST',
    url: `${BASE_URL}posts`, 
    data,
    headers: headers
  });
  return response;
}


/** 
 * get replies related to a post
 * 
 * @params { id } post_id of the parent post
 *  
 * @returns [
 *            { id, parent_id, username, body, created_on }, 
 *            ... 
 *          ]
 * 
 * @usedby dogfriendsRepliesSlice
 */
const getRepliesById = async (id) => {
  const response = await axios({
    method: 'GET',
    url: `${BASE_URL}replies/${id}`,
    headers: headers
  });
  return response;
}

/** 
 * add a new reply to a post
 * 
 * @params { data: { parent_id, username, body } } 
 *  
 * @returns { message: 'inserted' }
 * 
 * @usedby dogfriendsRepliesSlice
 */
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
 * User logs in 
 * 
 * @params { data: { username, password } }
 * 
 * @returns { token } 
 * 
 * @usedby Login
 * 
 */
const login = async (data) => {
  
  return await axios({
      method: 'POST',
      url: `${BASE_URL}login`,      
      data,
      headers: headers
    });
}


/**
 * Checks to see if username is already in use 
 * 
 * @params { data: { username } }
 * 
 * @returns { resp: boolean }
 * 
 * @usedby Login
 * 
 */
const preSignupUsernameCheck = async (data) => {
  return await axios({
    method: 'POST',
    url: `${BASE_URL}users/${data.username}`,
    data,
    headers: headers
  });
}

/**
 * User logs in 
 * 
 * @params { data: {
              username, (required)
              password, (required)
              first_name, (required)
              last_name, (required)
              email, (required)
              city, (optional)
              state, (optional)
              country (optional)
            } }
 * 
 * @returns { token } 
 * 
 * @usedby Login
 * 
 */
const signup = async (data) => { 
  return await axios({
    method: 'POST',
    url: `${BASE_URL}users`,
    data,
    headers: headers
  });  
}


/**
 * Get user information 
 * 
 * @params { data: { username, token } }
 * 
 * @returns { token } 
 * 
 * @usedby Login, Navbar
 * 
 */
const getUserInfo = async (data) => {
  const {username, token} = data;
  return await axios({
    method: 'GET',
    url: `${BASE_URL}users/${username}`,
    data: {_token: token},
    headers: headers
  });
}


/**
 * getInitInfo gets aws endpoints for uploading and 
 * downloading images 
 * 
 * @params none
 * 
 * @returns { aws_bucket_endpoint_up, aws_bucket_endpoint_down }
 * 
 * @usedby Navbar
 * 
 */
const getInitInfo = async () => {
  return await axios({
    method: 'GET',
    url: `${BASE_URL}initinfo`,
    headers: headers
  });  
}


/**
 * Updates user information 
 * 
 * @params { data: {
              username, (required)
              password, (required)
              first_name, (required)
              last_name, (required)
              email, (required)
              city, (optional)
              state, (optional)
              country (optional)
              photo_id (optional)
            } }
 * 
 * @returns { token } 
 * 
 * @usedby Profile
 * 
 */
const patchUserInfo = async (data) => {
  return await axios({
    method: 'PATCH',
    url: `${BASE_URL}users/${data.username}`,
    data,
    headers: headers
  }); 
}


/**
 * Gets image ArrayBuffer from AWS bucket 
 * 
 * @param {String} key - key identifier to AWS S3 
 * @param {String} lambdaUrl - url endpoint to AWS Lambda function
 * 
 * @returns { data: ArrayBuffer }
 * 
 * @usedby Post, UserAvatar, useImageUrl
 * 
 */
const getPhotoBySrc = async (key, lambdaUrl) => {  
  return await axios({
    method: 'POST',
    url: lambdaUrl,
    data: {key},
    headers: headers
  });
  // return await request(lambdaUrl, {key}, 'post');
}


/**
 * puts Base 64 image/jpeg string into AWS S3 bucket
 * 
 * posts image_id and url to database
 * @params { data: { username } }
 * 
 * @returns { id, url }
 * 
 * @usedby PostFormNew, Profile
 * 
 */
/**
 * 
 * @param {String} image 
 * @param {String} imageName 
 * @param {String} aws_endpoint_up 
 * @param {String} _token 
 * @param {String} aws_endpoint_down 
 * @returns 
 */
const putNewPhoto = async (image, imageName, aws_endpoint_up, _token, aws_endpoint_down) => { 
  
  try {
    // upload photo to AWS S3 bucket   
    // const res = await request(aws_endpoint_up, {image, imageName}, 'put');
    const response = await axios({
      method: 'PUT',
      url: aws_endpoint_up,
      data: {image, imageName},
      headers: headers
    });
    if(response) {
      // write image data to database photos table
      const data = {
        photo_id: imageName,
        photo_url: `${aws_endpoint_down}/${imageName}`,
        _token
      }
      // await request(`${BASE_URL}photos/`, data, 'post');
      return await axios({
        method: 'POST',
        url: `${BASE_URL}photos`,
        data: {
          photo_id: imageName,
          photo_url: `${aws_endpoint_down}/${imageName}`,
          _token
        },
        headers: headers
      });
    }
    return;
  } catch (error) {
    console.error(error);
  }
  
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
  getInitInfo,
  getPhotoBySrc,
  putNewPhoto
};