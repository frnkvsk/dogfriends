/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

/** GET /[id]  get detail on post
 *
 * Returns: [ parent_post, children_post ... ]
 *
 * =>   [{ id,
 *         body,
 *         created_on,
 *         username,
 *         parent_id,
 *         photo_id
 *       }, 
 *       ...
 *      ]
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT *
       FROM replies
       WHERE parent_id=$1
       ORDER BY created_on
      `, [req.params.id]      
    );    
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** POST /     add a new post
 *
 * { title, body, username }  =>  { id, title, body, username }
 *
 */

router.post("/", authRequired, async function (req, res, next) {
  try {
    const {parent_id, username, body} = req.body;

    await db.query(
      `INSERT INTO replies (parent_id, username, body) 
        VALUES ($1, $2, $3)`,
      [parent_id, username, body]);
      return res.json({ message: "inserted" });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]     delete post
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", ensureCorrectUser, async (req, res, next) => {
  try {
    await db.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
