const pg = require('pg');

//pool connects the server to the database
const pool = new pg.Pool({
    database: 'taskmanager',
    host: 'localhost',
    port: 5432
});

module.exports = pool;