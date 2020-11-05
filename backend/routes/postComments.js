/** Routes for post comment. */

const db = require("../db");
const express = require("express");
const { v4: uuid } = require('uuid');
const router = express.Router({ mergeParams: true });
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

/** GET /        get comments for post
 *
 * => { id, text, photo_url }
 *
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT c.id, c.text 
       FROM comments c       
       LEFT JOIN photos p ON c.photo_id = p.id
       AND post_id = $1 
       ORDER BY id`,
      [req.params.id]);
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});


/** POST /      add a comment
 *
 * => { id, text }
 *
 */

router.post("/:id", authRequired, async function (req, res, next) {
  try {
    const newId = uuid();
    const result = await db.query(
      `INSERT INTO comments (id, text, post_id, photo_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, text, post_id, photo_id`,
       [newId, req.body.text, req.params.id, req.body.photo_id]);

    const comment_id = result.rows[0].id;    
    await db.query(`INSERT INTO comment_user (comment_id, username) 
                    VALUES ($1, $2)`,
                    [comment_id, req.username]);

    const photo_id = result.rows[0].photo_id;
    if(photo_id.length) {
      await db.query(`INSERT INTO photo_user (photo_id, username) 
                      VALUES ($1, $2)`,
                      [photo_id, req.username]);
    }
    
      
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]      update comment
 *
 * => { id, text }
 *
 */

router.put("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const result = await db.query(
      `UPDATE comments 
       SET text=$1 
       WHERE id = $2 
       RETURNING id, text`,
      [req.body.text, req.params.id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]      delete comment
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    await db.query(`DELETE FROM comments 
                    WHERE id=$1`, 
                    [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
