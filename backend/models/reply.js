const db = require("../db");

class Reply {
  static async getReplies(id) {
    const result = await db.query(
      `SELECT *
       FROM replies
       WHERE parent_id=$1
       ORDER BY created_on
      `, [req.params.id]      
    );    
    
    if(!result.rows.length) {
      const error = new Error("Invalid Credentials");
      error.status = 401;
      throw error;
    }
    return res.json(result.rows);
  }

  static async replyToPost(parent_id, username, body) {
    const response = await db.query(
      `INSERT INTO replies (parent_id, username, body) 
        VALUES ($1, $2, $3)`,
      [parent_id, username, body]);
    return res.json({ message: "inserted" });
  }
}

module.exports = Reply;