import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { v4 as uuid } from 'uuid';

import TestData from '../../src/test-utils/test-data';

const BASE_URL = 'http://localhost:5000/api/';
const BUCKET_UP='https://3ynkxwkjf5.execute-api.us-west-2.amazonaws.com/dev/upload'
const BUCKET_DOWN='https://qljffa4b43.execute-api.us-west-2.amazonaws.com/dev/images'
// declare which API requests to mock
const server = setupServer(
  
  /* posts */
  // get all posts
  rest.get(`${BASE_URL}posts`, (req, res, ctx) => {
    return res(ctx.json(
      [
        {
          ...TestData.post1
        },
        {
          ...TestData.post2
        }
      ]
    ));
  }),  
  // create new post
  rest.post(`${BASE_URL}posts`, (req, res, ctx) => {
    data = {
      id: uuid(),
      ...TestData.post1
    }
    return res(ctx.json(
      {
        ...TestData.post1
      }
    ));
  }),
  
  /* replies */
  // get replies by post id
  rest.get(`${BASE_URL}replies/postId`, (req, res, ctx) => {
    return res(ctx.json(
      [
        {
          ...TestData.reply1
        },
        {
          ...TestData.reply2
        }
      ]
    ));
  }), 
  // create new reply
  rest.post(`${BASE_URL}replies`, (req, res, ctx) => {
    data = {
      ...TestData.reply1,
      ...TestData._token
    }
    return res(ctx.json(
      {
        ...TestData.post1
      }
    ));
  }),

  /* login */
  rest.post(`${BASE_URL}login`, (req, res, ctx) => {
    validLoginCredentials = {
      ...TestData.user1.username,
      ...TestData.user1.password
    }
    // data = {
    //   ...TestData.user1.username,
    //   ...TestData.user1.password
    // }
    console.log(JSON.stringify(data) , JSON.stringify(validLoginCredentials))

    if(JSON.stringify(data) === JSON.stringify(validLoginCredentials)) {
      return res(ctx.json(
        {
          ...TestData.user1.token
        }
      ));
    } 
    throw new Error('Error login9');
    
  }),

  /* signup */
  // pre signup check if username already exists
  rest.post(`${BASE_URL}users/${TestData.user1.username}`, (req, res, ctx) => {
    return res(ctx.json(
      {
        resp: false
      }
    ));
  }),
  // signup
  rest.post(`${BASE_URL}users`, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      {
        token: TestData._token
      }
    ));
  }),

  /* get user information */
  rest.get(`${BASE_URL}users/${TestData.user1.username}`, {...TestData._token}, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      [
        {
          ...TestData.user1
        }
      ]
    ));
  }),

  /* get init info */
  rest.get(`${BASE_URL}initinfo`, (req, res, ctx) => {
    return res(ctx.json(
      {
        aws_bucket_endpoint_up: 'AWS_BUCKET_ENDPOINT_UP',
        aws_bucket_endpoint_down: 'AWS_BUCKET_ENDPOINT_DOWN'
      }      
    ));
  }),

  /* patchUserInfo */
  rest.patch(`${BASE_URL}users/${TestData.user1.username}`, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      {
        ...TestData.user1
      }
    ));
  }),
  /* patchUserInfo */
  rest.patch(`${BASE_URL}users/${TestData.user1.username}`, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      {
        ...TestData.user1
      }
    ));
  }),
  /* patchUserInfo */
  rest.patch(`${BASE_URL}users/${TestData.user1.username}`, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      {
        ...TestData.user1
      }
    ));
  }),

  /* getPhotoBySrc */
  rest.post(BUCKET_DOWN, (req, res, ctx) => {
    data = {
      ...TestData.user1.photo_id
    }
    return res(ctx.json(
      {
        ...TestData.user1
      }
    ));
  }),
  
  /* putNewPhoto */
  rest.put(`${BUCKET_UP}/${TestData.user1.photo_id}.txt`, (req, res, ctx) => {
    data = {
      ...TestData.user1
    }
    return res(ctx.json(
      {
        ...TestData.user1
      }
    ));
  }),

)

export { server }
