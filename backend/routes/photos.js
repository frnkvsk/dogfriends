/** Routes for photos. */
require('dotenv/config');
const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true });
const { ensureCorrectUser, authRequired } = require("../middleware/auth");
const Photo = require('../models/photo');

/**
 *  get photo by id for post or comment
 *  GET /        
 *
 *  Returns: { id }  =>  { id, url, created_on }
 *
 */
router.get("/:id", async function (req, res, next) {
  try {
    // const result = await db.query(
    //   `SELECT id, url, created_on
    //    FROM photos 
    //    WHERE id = $1 
    //    ORDER BY id`,
    //   [req.params.id]);
    // const result2 = res.json(result.rows[0]);
    const result = await Photo.findOne(req.params.id)
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** 
 * add a new photo
 * POST /      
 *
 * { photo_id, url, token } => { photo_id, url }
 *
 */
router.post("/", authRequired, async function (req, res, next) {  
  try {
    const photo_id = req.body.photo_id;
    const photo_url = req.body.photo_url;
    const result = await Photo.addNew(photo_id, photo_url);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

/** 
 * delete a photo
 * DELETE /[id]      
 *
 * { id } => { message: "deleted" }
 *
 */
router.delete("/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    const result = await Photo.remove(req.params.id);
    // await db.query(`DELETE FROM photos 
    //                 WHERE id=$1`, 
    //                 [req.params.id]);
    // console.log('delete result',result)
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
