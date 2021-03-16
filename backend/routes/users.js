/** Routes for users. */
const express = require("express");
const router = express.Router();
const { ensureCorrectUser, authRequired } = require("../middleware/auth");

const User = require("../models/user");
const { validate } = require("jsonschema");

const { userNewSchema, userUpdateSchema } = require("../schemas");

const createToken = require("../helpers/createToken");


/** 
 *  get a single user
 *  GET /[username] => {user: user} 
 */
router.get("/:username", authRequired, async function(req, res, next) {
  try {
    const user = await User.findOne(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/**
 * pre registration username check
 * check if username is already taken
 */
router.post("/:username", async function(req, res, next) {
  let resp = await User.usernameCheck(req.params.username);
  return res.status(201).json({resp});
});

/** 
 * register
 * POST / {userdata}  => {token: token} 
 */
router.post("/", async function(req, res, next) {
  try {
    delete req.body._token;
    const validation = validate(req.body, userNewSchema);

    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
});

/** 
 * update user information
 * PATCH /[handle] {userData} => {user: updatedUser} 
 */
router.patch("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    delete req.body.username;
    delete req.body.admin;
    const validation = validate(req.body, userUpdateSchema);
    if (!validation.valid) {
      return next({
        status: 400,
        message: validation.errors.map(e => e.stack)
      });
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

/** 
 *  delete a single user
 *  DELETE /[handle]  =>  {message: "User deleted"} 
 */
router.delete("/:username", ensureCorrectUser, async function(req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ message: "User deleted" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
