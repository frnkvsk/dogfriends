/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const Reply = require('../models/reply');

/** 
 * get replies related to a post
 * GET /[id]  
 *
 * Returns: [ parent_post ] =>
 *          [{ id, parent_id, username, body, created_on }, ... ]
 */
router.get("/:id", async function (req, res, next) {
  try {
    const result = await Reply.getReplies(req.params.id);
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** 
 * add a reply to a post
 * POST /     
 * 
 * Returns { parent_id, username, body }  =>  { message: "inserted" }
 *
 */
router.post("/", authRequired, async function (req, res, next) {
  try {
    const {parent_id, username, body} = req.body;
    await Reply.replyToPost(parent_id, username, body);
    // await db.query(
    //   `INSERT INTO replies (parent_id, username, body) 
    //     VALUES ($1, $2, $3)`,
    //   [parent_id, username, body]);
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
