
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
    //id: Note: id is not created yet,
    title: 'testtitle1', 
    body: 'testbody1',
    replies: 1,
    votes: 1, 
    photo_id: 'testphotoid1',
    username: 'testusername1',
  }
  static post2 = {
    //id: Note: id is not created yet,
    title: 'testtitle2', 
    body: 'testbody2',
    replies: 1,
    votes: 1, 
    photo_id: 'testphotoid2',
    username: 'testusername1',
  }
  static reply1 = {
    //id: Note: id is not created yet,
    //parent_id: Note: parent_id is not created yet,
    username: 'testusername1',
    body: 'testbody1',
  }
  static reply2 = {
    //id: Note: id is not created yet,
    //parent_id: Note: parent_id is not created yet,
    username: 'testusername1',
    body: 'testbody2',
  }
  static photo1 = {
    photo_id: 'testphotosid1',
    photo_url: 'testurl1'
  }
  static photo2 = {
    photo_id: 'testphotosid2',
    photo_url: 'testurl2'
  }
}

module.exports = TestData;