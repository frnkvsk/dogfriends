/** Routes for photos. */
require('dotenv/config');
const db = require("../db");
const express = require("express");
const { v4: uuid } = require('uuid');
const router = express.Router({ mergeParams: true });
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

///home/fv/js/capstone2/dogfriends/backend/test-images
///home/fv/js/capstone2/dogfriends/backend/routes
/** GET /        get photo by id for post or comment
 *
 * => { id, text }
 *
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, url, public_id, signature
       FROM photos 
       WHERE id = $1 
       ORDER BY id`,
      [req.params.id]);
    const result2 = res.json(result.rows[0]);
    console.log('---result',result2)
    return result2;
  } catch (err) {
    return next(err);
  }
});


/** POST /      add a photo
 *
 * => { id, url }
 *
 */

router.post("/", authRequired, async function (req, res, next) {
  
  try {
    const photo_id = req.body.photo_id;
    const photo_url = req.body.photo_url;
    console.log('---photos photo_id',photo_id,'  photo_url',photo_url)
    const result = await db.query(
      `INSERT INTO photos (id, url) 
       VALUES ($1, $2) 
       RETURNING id, url`,
       [photo_id, photo_url]);
      
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
    await db.query(`DELETE FROM photos 
                    WHERE id=$1`, 
                    [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
