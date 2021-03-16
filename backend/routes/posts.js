/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const Post = require('../models/post');



/** 
 * get all posts order of newest first
 * GET /   
 *
 * Returns: () => [ 
 *                  { id, title, body, replies, votes, created_on, username,},
 *                  ...
 *                ]
 *
 */
router.get("/", async function (req, res, next) {
  try {
    const response = await Post.findAll();
    return res.json(response.rows);
  } catch (err) {
    return next(err);
  }
});

/** 
 * get one post matching user id of post
 * GET /[id]  
 *
 * Returns: [ id ] => [{ id, title, body, replies, votes, created_on, username}]
 * 
 */
router.get("/:id", async function (req, res, next) {
  try {
    const result = await Post.findOne(req.params.id);    
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/**
 * add a new post 
 * POST /     
 *
 * Returns: { title, body, username, photo_id }  =>  { id, title, body, username }
 *
 */
router.post("/", authRequired, async function (req, res, next) {
  try {
    const {title, body, photo_id, username} = req.body;
    const result = await Post.addNew(title, body, username, photo_id);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

/** 
 * delete a post
 * DELETE /[id]     
 *
 * Returns: () => { message: "deleted" }
 *
 */
router.delete("/:id", ensureCorrectUser, async (req, res, next) => {
  try {
    const result = await Post.remove(req.params.id);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
