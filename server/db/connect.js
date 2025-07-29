const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.DB_URL // using the db url from the env
    
})

console.log("DB connection established.");

module.exports = db;


