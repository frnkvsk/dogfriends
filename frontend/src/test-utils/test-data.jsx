const _token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZTEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYxNTg1ODQ1MH0.JszLq1_P2rkTiigIAy89vFNss6KNhSaXYWvf7-TJL9U';

class TestData {
  static _token = {_token};

  static user1 = {
    _token, 
    username: 'testusername1',
    password: 'testPassword1',
    first_name: 'testfirstname1',
    last_name: 'testlastname1',
    email: 'test@test1.com',
    city: 'testcity1',
    state: 'teststate1',
    country: 'testcountry1',
    photo_id: 'testphotoid1',
    admin: false
  }
  static user2 = {
    _token, 
    username: 'testusername2',
    password: 'testPassword2',
    first_name: 'testfirstname2',
    last_name: 'testlastname2',
    email: 'test@test2.com',
    city: 'testcity2',
    state: 'teststate2',
    country: 'testcountry2',
    photo_id: 'testphotoid2',
    admin: false
  }
  static post1 = {
    id: 'd6d98b88-c866-4496-9bd4-de7ba48d0f52',
    title: 'testtitle1', 
    body: 'testbody1',
    replies: 1,
    votes: 1, 
    created_on: '2021-02-25 15:10:11.439095',
    photo_id: 'testphotoid1',
    username: 'testusername1',
  }
  static post2 = {
    id: '29fa7bf9-0728-4272-a7bc-5b7c964f332d',
    title: 'testtitle2', 
    body: 'testbody2',
    replies: 1,
    votes: 1, 
    created_on: '2021-03-05 17:00:25.59219',
    photo_id: 'testphotoid2',
    username: 'testusername1',
  }
  static reply1 = {
    id: 'c9edd02c-c9f3-41de-b9d9-22a146bf8550',
    parent_id: 'd6d98b88-c866-4496-9bd4-de7ba48d0f52',
    username: 'testusername1',
    created_on: '2021-03-05 17:00:25.59219',
    body: 'testbody1',
  }
  static reply2 = {
    id: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
    parent_id: 'd6d98b88-c866-4496-9bd4-de7ba48d0f52',
    username: 'testusername1',
    created_on: '2021-03-05 17:00:25.59219',
    body: 'testbody2',
  }
  static photo1 = {
    photo_id: 'testphotosid1',
    photo_url: 'testurl1',
    created_on: '2021-03-05 17:00:25.59219',
  }
  static photo2 = {
    photo_id: 'testphotosid2',
    photo_url: 'testurl2',
    created_on: '2021-03-05 17:00:25.59219',
  }
}

export default TestData;