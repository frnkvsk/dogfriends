/** Database connection for Dogfriends. */

const { Client } = require("pg");

// database username
const databaseUserName = "postgres";

// database user password
const databaseUserPassword = "springboard";

// port
const port = "5432";

let DB_URI = `postgres://${ databaseUserName }:${ databaseUserPassword }@localhost:${ port }/dogfriends`;
const client = new Client(process.env.DATABASE_URL || DB_URI);

client.connect();


module.exports = client;
