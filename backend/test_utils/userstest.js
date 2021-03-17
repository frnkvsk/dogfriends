
const request = require('supertest');

const app = require('../../app');
const db = require('../../db');

const User = require('../../models/user');
const TestData = require('../../test_utils/test-data');


beforeAll(async () => {
  await db.query('DELETE FROM users');
});

afterAll(async () => {
  await db.query('DELETE FROM users');
  await db.end();
});

/**
 *  register
 *  POST / {userdata}  => {token: token}
 */
describe('POST /users', () => {
  it('Create a new user', async () => {
    const response = await request(app)
        .post('/api/users')
        .send(TestData.user1);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
    const user = await User.findOne(TestData.user1.username);
    for(let key in user) {
      expect(user[key]).toEqual(TestData.user1[key]);
    }
  });

  it(`Can't create a new user with a duplicate username`, async () => {
    // TestData.user1 still committed in the db after previous test
    const response = await request(app)
        .post('/api/users')
        .send(TestData.user1);
    expect(response.statusCode).toBe(409);
  });

  it(`Can't create a new user without required field first_name`, async () => {
    const testUser = Object.assign({}, TestData.user1);
    delete testUser.first_name
    const response = await request(app)
        .post('/api/users')
        .send(testUser);
    expect(response.statusCode).toBe(400);
  });
});

/** 
 *  get a single user
 *  GET /[username] => {user: user} 
 */
describe('GET /:username', () => {
  it('Gets a single user', async () => {
    const response = await request(app)
        .get(`/api/users/${TestData.user1.username}`)
        .send({_token: `${TestData.user1._token}`});
        
    expect(response.body.user.username).toEqual(TestData.user1.username);
  });

  it(`Can't get a user that doesn't exist`, async () => {
    const response = await request(app)
        .get(`/api/users/wrongusername`)
        .send({_token: `${TestData.user1._token}`});
        
    expect(response.statusCode).toEqual(404);
  });
});

/**
 * pre registration username check
 * check if username is already taken
 */
describe('POST /:username', () => {
  test('Can check if username exists', async () => {
    const response = await request(app)
        .post(`/api/users/${TestData.user1.username}`);
    expect(response.body.resp).toBe(true);
  });

  test('Can check if wrong username does not exist', async () => {
    const response = await request(app)
        .post('/api/users/wrongusername');
    expect(response.body.resp).toBe(false);
  });
});

/** 
 * update user information
 * PATCH /[handle] {userData} => {user: updatedUser} 
 */
describe('PATCH /users/:username', () => {
  it(`Updates a single a user's email address and city`, async () => {
    const newUser = Object.assign({}, TestData.user1);
    newUser.email = 'newEmail@newEmail.com';
    newUser.city = 'newCity';
    delete newUser.password;
    const response = await request(app)
        .patch(`/api/users/${TestData.user1.username}`)
        .send(newUser);
    const user = response.body.user;
    expect(user).toHaveProperty('username');
    expect(user).not.toHaveProperty('password');
    expect(user.first_name).toBe(TestData.user1.first_name);
    expect(user.email).toBe('newEmail@newEmail.com');
    expect(user.city).toBe('newCity');
    expect(user.username).not.toBe(null);
  });

  it(`Can't update with wrong username`, async () => {
    const newUser = Object.assign({}, TestData.user1);
    newUser.username = 'wrongUsername';
    delete newUser.password;
    const response = await request(app)
        .patch(`/api/users/${newUser.username}`)
        .send(newUser);
    expect(response.statusCode).toBe(401);
  });
});

/** 
 *  delete a single user
 *  DELETE /[handle]  =>  {message: 'User deleted'} 
 */
describe('DELETE /users/:username', () => {
  it('Can delete a single a user', async () => {
    const response = await request(app)
        .delete(`/api/users/${TestData.user1.username}`)
        .send(TestData.user1);
    expect(response.body).toEqual({message: 'User deleted'});
  });

  it(`Can not delete a user that is not in database`, async () => {
    const response = await request(app)
        .delete(`/api/users/${TestData.user1.username}`)
        .send(TestData.user1);
    expect(response.statusCode).toBe(404);
  });
});
