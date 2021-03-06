/** API routes for initInfo */

const express = require("express");
const router = new express.Router();
require("dotenv").config();

/**
 * AWS
 */
const AWS_BUCKET_ENDPOINT_DOWN = process.env.AWS_IMAGE_BUCKET_URL_BASE; 
const AWS_BUCKET_ENDPOINT_UP = process.env.AWS_UPLOAD_IMAGE_LAMBDA_URL;

/**
 * GET / 
 * 
 * Returns: { AWS_BUCKET_ENDPOINT }
 */
router.get("/", function (req, res, next) {
  try {
    const data = {
      aws_bucket_endpoint_up: AWS_BUCKET_ENDPOINT_UP,
      aws_bucket_endpoint_down: AWS_BUCKET_ENDPOINT_DOWN
    }
    console.log('data',data)
    return res.json( data );
  } catch (err) {
    return next(err);
  }
});

module.exports = router;