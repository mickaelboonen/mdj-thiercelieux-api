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

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query(`SELECT * FROM \`stats\` WHERE \`user_id\` = ${req.params.id}`, (error, results, fields) => {
    if (error) throw error;
    let [stat] = results;
    res.send(stat);
    });
  db.end();
});

router.patch('/:id', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: { currentStat } } = req;
  delete currentStat.userId;
  const sql = 'UPDATE `stats` SET ? WHERE `user_id` = ' + currentStat.user_id;
  db.query(sql, currentStat, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
  db.end();
});


module.exports = router;
