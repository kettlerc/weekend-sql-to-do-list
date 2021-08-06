const pg = require('pg');

const pool = new pg.Pool({
    database: 'taskmanager',
    host: 'localhost',
    port: 5432
});

module.exports = pool;