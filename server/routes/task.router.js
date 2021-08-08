const express = require('express');
const router = express.Router();
const pg = require('pg');
const pool = require('../modules/pool');


//GET endpoint to retrieve all data in the database
router.get('/', (req, res) =>{
    let sqlQuery = `
        SELECT * FROM "tasks"
        ORDER BY "id" ASC;
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows);
        }).catch((err) => {
            console.log('GET failed', err);
            res.sendStatus(500);
        });
});


//POST endpoint to add new task to database
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


//PUT endpoint to change a task from incomplete to complete
router.put('/:id', (req, res) => {
    let sqlQuery =`
        UPDATE "tasks"
        SET "isComplete" = NOT "isComplete"
        WHERE "id" = $1;
    `;
    let sqlParams = [
        req.params.id
    ];
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log('Update err', err);
            res.sendStatus(500);
        });
});


//DELETE endpoint to remove task from the database
router.delete('/:id', (req, res) => {
    let sqlQuery = `
        DELETE FROM "tasks"
        WHERE "id" = $1
    `;
    let sqlParams = [
        req.params.id
    ];
    console.log(sqlParams);
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log('DELETE err', err);
            res.sendStatus(500);
        });
});


module.exports = router;