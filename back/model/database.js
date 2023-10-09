const pg = require("pg");
const Pool = pg.Pool;

if (process.env.USER === undefined) {
    require('dotenv').config();
}

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

module.exports = pool;