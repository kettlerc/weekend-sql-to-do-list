const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');


//GET



//POST
router.post('/', (req, res) => {
    let sqlQuery = `
        INSERT INTO "tasks"
            ("task", "isComplete")
        VALUES
            ($1, $2);
    `;
    let sqlParams = [
        req.body.task,
        req.body.isComplete
    ];
    console.log(req.body);
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log('POST error', err);
            res.sendStatus(500);
        });
});


//PUT



//DELETE

module.exports = router;