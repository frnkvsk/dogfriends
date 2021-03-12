/** Database connection for Dogfriends. */
require("dotenv").config();
const Pool = require("pg").Pool;
let pool;

if(process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
  });
}

module.exports = pool;
