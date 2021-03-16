
const request = require('supertest');

const app = require('../app');
const db = require('../db');

const User = require('../models/user');
const User = require('../../models/');
const TestData = require('./test-data');


beforeAll(async function () {
  await db.query("DELETE FROM users");
});

afterAll(async () => {
  await db.query("DELETE FROM users");
  await db.end();
});