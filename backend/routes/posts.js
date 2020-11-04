/** API routes for posts. */

const db = require("../db");
const express = require("express");
const { v4: uuid } = require('uuid');
const router = new express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

/** GET /   get overview of posts
 *
 * Returns:
 *
 * => [ { id,
 *        title,
 *        description,
 *        votes,
 *      },
 *      ...
 *    ]
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              COALESCE(SUM(v.direction),0) votes
       FROM posts p
       LEFT JOIN votes v ON p.id = v.post_id
       GROUP BY p.id
       ORDER BY p.id;
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  get detail on post w/comments
 *
 * Returns:
 *
 * =>   { id,
 *        title,
 *        description,
 *        body,
 *        username,
 *        photo_id,
 *        comments: [ { id, text, url }, ... ],
 *      }
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.body,
              p.username,  
              p.photo_id,             
              CASE WHEN COUNT(c.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                CASE 
                  WHEN ph.id <> null THEN 
                    JSON_BUILD_OBJECT('id', c.id, 'text', c.text, 'url', ph.url)
                  ELSE
                    JSON_BUILD_OBJECT('id', c.id, 'text', c.text, 'url', null)
                END
                ) END AS comments
        FROM posts p 
        LEFT JOIN comments c ON c.post_id = $1 
        LEFT JOIN photos ph ON ph.id = c.photo_id
      WHERE p.id = $1  
      GROUP BY p.id    
      ORDER BY p.id
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
    
    return res.json(result.rows[0]);
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
 * { title, body, description, username }  =>  { id, title, body, description, username }
 *
 */

router.post("/", authRequired, async function (req, res, next) {
  try {
    const newId = uuid();
    const {title, body, description, photo_id} = req.body;
    const username = req.username;
    const result = await db.query(
      `INSERT INTO posts (id, title, description, body, username, photo_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id, title, description, body, username, photo_id`,
      [newId, title, description, body, username, photo_id]);

    if(photo_id && photo_id.length) {
      await db.query(`INSERT INTO photo_user (photo_id, username) 
      VALUES ($1, $2)`,
      [photo_id, username]);
    }    
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]     update existing post
 *
 * { title, description, body }  =>  { id, title, description, body, username }
 *
 */

router.put("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const {title, body, description} = req.body;
    const result = await db.query(
      `UPDATE posts SET title=$1, description=$2, body=$3, photo_id=$4
        WHERE id = $5 
        RETURNING id, title, description, body, photo_id, username`,
      [title, description, body, photo_id, req.params.id]);
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
