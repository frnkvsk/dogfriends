
/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const BCRYPT_WORK_FACTOR = 12;

const PORT = +process.env.PORT || 5000;

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "dogfriends-test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'dogfriends';
}


module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR
};

