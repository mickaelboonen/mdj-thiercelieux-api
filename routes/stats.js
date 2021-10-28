var express = require('express');
var router = express.Router();
var auth = require('express-jwt-token');
const bcrypt = require('bcrypt');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
// import { insertInto } from '../requests/insert';
// const { dump } = require('dumper.js');

// Destructuring
var dbData = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

// router.all('/login', auth.jwtAuthProtected);

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query(`SELECT * FROM \`stats\` WHERE \`user_id\` = ${req.params.id}`, (error, results, fields) => {
    if (error) throw error;
    // console.log(results);
    let [stat] = results;
    console.log(stat);

    res.send(stat);

    // const sql = 'UPDATE `stats` SET ? WHERE `user_id` = ' + currentState.userId;

    // db.query(sql, patch, (error, results, fields) => {
    //     if (error) throw error;
    //     console.log(results);
    //     res.send(results);
    //     db.end();
    //   });
    });
    db.end();
});


module.exports = router;
