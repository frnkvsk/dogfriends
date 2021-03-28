// model for post routes
const db = require('../db');

class Post {

  static async findAll() {
    const response = await db.query(
      `SELECT * FROM posts ORDER BY created_on DESC`
    ); 
    if(!response.rows.length) {
      const error = new Error('Server Unavailable');
      error.status = 503;
      throw error;
    }
    
    return response;
  }

  static async findOne(id) {
    const response = await db.query(
      `SELECT *
       FROM posts
       WHERE id=$1
       ORDER BY created_on
      `, [id]      
    );
    if(!response.rows.length) {
      const error = new Error('Invalid Credentials');
      error.status = 401;
      throw error;
    }
    
    return response;
  }

  static async addNew(title, body, username, photo_id) {
    const response = await db.query(
      `INSERT INTO posts (title, body, username, photo_id) 
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, body, username`,
      [title, body, username, photo_id]);

    return response;
  }
  
  static async remove(id) {
    const response = await db.query('DELETE FROM posts WHERE id = $1', [id]);
    return response;
  }
}

module.exports = Post;