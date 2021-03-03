/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const AWS_BUCKET_ENDPOINT = process.env.AWS_IMAGE_BUCKET_URL_BASE; 



/** GET /   get overview of posts
 *
 * Returns:
 *
 * => [ { id
 *      },
 *      ...
 *    ]
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const response = await db.query(
      `SELECT * FROM posts ORDER BY created_on`
    );
    
    const result = response.rows.map(e => (
      {...e,
      base_url: AWS_BUCKET_ENDPOINT}
    ));
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

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
       FROM posts
       WHERE id=$1
       ORDER BY created_on
      `, [req.params.id]      
    );
    if(result.rows.length) {
      const votes = await db.query(
        `SELECT COALESCE(SUM(v.direction),0) votes
        FROM votes v
        WHERE post_id = $1`,
        [req.params.id]
      );
      result.rows[0].votes = votes.rows[0].votes;
    }
    
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});


/** POST /[id]/vote/(up|down)    Update up/down as post
 *
 * => {  }
 *
 */

router.post("/:id/vote/:direction", authRequired, async function (req, res, next) {
  try {
    const delta = req.params.direction === "up" ? +1 : -1;
    const username= req.username;
    const result = await db.query(
      `INSERT INTO votes (post_id, username, direction) 
        VALUES ($1, $2, $3)
        ON CONFLICT (post_id, username) DO UPDATE
        SET direction = $3`,
      [req.params.id, username, delta]);
    return res.json(result.rows[0]);
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
    const {title, body, photo_id, username} = req.body;

    await db.query(
      `INSERT INTO posts (title, body, username, photo_id) 
        VALUES ($1, $2, $3, $4)`,
      [title, body, username, photo_id]);
    
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]     update existing post
 *
 * { title, body }  =>  { id, title, body, username }
 *
 */

router.put("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const {title, body, photo_id} = req.body;
    const result = await db.query(
      `UPDATE posts SET title=$1, body=$2, photo_id=$3
        WHERE id = $4 
        RETURNING id, title, body, photo_id, username`,
      [title, body, photo_id, req.params.id]);
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
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
