const request = require('supertest');

const app = require('../app');
const db = require('../db');

const User = require('../models/user');
const Post = require('../models/post');
const TestData = require('./test-data');


beforeAll(async () => {
  await db.query('DELETE FROM users');
  await request(app)
        .post('/api/users')
        .send(TestData.user1);

});

afterAll(async () => {
  await db.query('DELETE FROM posts');
  await db.query('DELETE FROM users');
  
  await db.end();
});

describe('GET / ', () => {
  it('Can get all posts', async () => {
    let {title, body, username, photo_id} = TestData.post1;

    await Post.addNew(title, body, username, photo_id);

    const response = await request(app)
      .get('/api/posts/');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(1);
  });
});

describe('GET /id', () => {
  it('Can get single post that matches id', async () => {
    const posts = await request(app)
      .get('/api/posts/');
    const {id} = posts.body[0];
    const response = await request(app)
      .get(`/api/posts/${id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].id).toEqual(id);
  });

  it('Can NOT get single post with incorrect id', async () => {
    const id = 'wrongid';
    const response = await request(app)
      .get(`/api/posts/${id}`);
    
    expect(response.statusCode).toBe(500);
  });
});

describe('POST /', () => {  
  it('Can add a new post', async () => {
    const response = await request(app)
      .post('/api/posts/')
      .send({...TestData.post2, ...TestData._token});
      
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual(TestData.post2.title);
  });
  

  it('Can NOT add a new post without token', async () => {
    // clear post2 added in previous test
    const posts = await request(app)
      .get('/api/posts/');
    const {id} = posts.body[1];
    await Post.remove(id);

    const response = await request(app)
      .post('/api/posts/')
      .send({...TestData.post2});
      
    expect(response.statusCode).toBe(401);
  });

  it('Can NOT add a new post with invalid token', async () => {
    const response = await request(app)
      .post('/api/posts/')
      .send({...TestData.post2, _token: 'wrongtoken'});
      
    expect(response.statusCode).toBe(401);
  });
});

describe('DELETE /id', () => {
  it('Can delete post with valid id', async () => {
    // add post2 back into database
    const addedPost = await request(app)
      .post('/api/posts/')
      .send({...TestData.post2, ...TestData._token});
      
    expect(addedPost.statusCode).toBe(200);
    expect(addedPost.body.title).toEqual(TestData.post2.title);
    // get id of post2
    const {id} = addedPost.body;
    // delete post2
    const response = await request(app)
      .delete(`/api/posts/${id}`)
      .send({...TestData._token, username: TestData.user1.username});
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({'message': 'deleted'});
  });
});