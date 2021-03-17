// model for photos routes
const db = require('../db');

class Photo {

  static async findOne(id) {
    const response = await db.query(
      `SELECT id, url, created_on
       FROM photos 
       WHERE id = $1 
       ORDER BY id`,
      [id]);

    if(!response.rows.length) {
      const error = new Error('Invalid Credentials');
      error.status = 401;
      throw error;
    }
    
    return response;
  }

  static async addNew(photo_id, photo_url) {
    const response = await db.query(
      `INSERT INTO photos (id, url) 
       VALUES ($1, $2) 
       RETURNING id, url`,
       [photo_id, photo_url]); 
       
    if(!response.rows.length) {
      const error = new Error('Invalid Credentials');
      error.status = 401;
      throw error;
    }
    return response;
  }

  static async remove(id) {
    const response = await db.query('DELETE FROM photos WHERE id = $1', [id]);
    if(response.rows[0] !== { message: "deleted" }) {
      console.log('-------------------ERROR DELETING')
    }
    return response;
  }
}

module.exports = Photo;