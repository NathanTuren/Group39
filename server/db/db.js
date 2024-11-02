const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "testpassword",
    host: "localhost",
    port: "5452",
    database: "volunteermatch"
});

module.exports = pool;