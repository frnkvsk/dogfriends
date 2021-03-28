// model for reply routes
const db = require('../db');

class Reply {
  static async getAll(id) {
    const response = await db.query(
      `SELECT *
       FROM replies
       WHERE parent_id=$1
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

  static async addNew(parent_id, username, body) {
    console.log('----------reply parent_id, username, body',parent_id, username, body)
    const response = await db.query(
      `INSERT INTO replies (parent_id, username, body) 
        VALUES ($1, $2, $3)
        RETURNING *`,
      [parent_id, username, body]);
      console.log('----------reply response',response)
    if(response.rows[0].parent_id !== parent_id) {
      const error = new Error('Invalid Credentials');
      error.status = 400;
      throw error;
    }
    return response.rows[0];
  }
  static async removeOne(id) {
    const response = await db.query(
      `DELETE FROM replies 
      WHERE id = $1`, 
      [id]);
    return response;
  }
}

module.exports = Reply;