/** API routes for initInfo */

const express = require("express");
const router = new express.Router();
const { authRequired } = require("../middleware/auth");

/**
 * AWS
 */
const AWS_BUCKET_ENDPOINT = process.env.AWS_IMAGE_BUCKET_URL_BASE; 
const AWS_UPLOAD_ENDPOINT = process.env.AWS_UPLOAD_IMAGE_LAMBDA_URL;

/**
 * GET / 
 * 
 * Returns: { AWS_BUCKET_ENDPOINT }
 */
router.get("/", function (req, res, next) {
  try {
    return res.json( AWS_BUCKET_ENDPOINT );
  } catch (err) {
    return next(err);
  }
});

 /**
  * POST /
  * 
  * Input: req._token
  * 
  * Returns: { AWS_UPLOAD_ENDPOINT }
  */
router.post("/", authRequired, function (req, res, next) {
  try {
    const data = {
      'bucket_base': AWS_BUCKET_ENDPOINT,
      'upload_base': AWS_UPLOAD_ENDPOINT
    }
    return res.json( data );
  } catch (err) {
    return next(err);
  }
});

module.exports = router;