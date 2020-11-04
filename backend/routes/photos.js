/** Routes for photos. */

const db = require("../db");
const express = require("express");
const { v4: uuid } = require('uuid');
const router = express.Router({ mergeParams: true });
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

/** GET /        get photo for post/comment
 *
 * => { id, text }
 *
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, url 
       FROM photos 
       WHERE id = $1 
       ORDER BY id`,
      [req.params.id]);
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});


/** POST /      add a photo
 *
 * => { id, url }
 *
 */

router.post("/:id", authRequired, async function (req, res, next) {
  try {
    const newId = uuid();
    const result = await db.query(
      `INSERT INTO photos (id, url) 
       VALUES ($1, $2) 
       RETURNING id, url`,
       [newId, req.body.url]);
    
    await db.query(
      `INSERT INTO photo_user (photo_id, username) 
                    VALUES ($1, $2)`,
                    [newId, req.username]);
      
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]      delete photo
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", ensureCorrectUser, async function (req, res, next) {
  try {

    // const del = await db.query(`DELETE FROM comment_user 
    //                 WHERE comment_id=$1 
    //                 AND username=$2
    //                 RETURNING *`,
    //                 [req.params.id, req.username]);
    // if(+del.rows[0].comment_id != +req.params.id) 
    //   throw new Error();            
    await db.query(`DELETE FROM photos 
                    WHERE id=$1`, 
                    [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
