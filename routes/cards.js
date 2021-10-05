var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// const { dump } = require('dumper.js');

// Destructuring
var { dbData } = require('../database/db');

/* GET roles listing. */
router.get('/roles', function(req, res, next) {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query('SELECT * FROM roles', (error, results, fields) => {
    if (error) {
      console.error(error);
    }
    // throw error;
    res.send(results);
  });
  db.end();
});

/* GET roles listing. */
router.get('/newmoon', function(req, res, next) {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query('SELECT * FROM \`new_moon\`', (error, results, fields) => {
    if (error) {
      console.error(error);
    }
    // throw error;
    res.send(results);
  });
  db.end();
});

/* GET roles listing. */
router.get('/village', function(req, res, next) {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query('SELECT * FROM village', (error, results, fields) => {
    if (error) {
      console.error(error);
    }
    // throw error;
    res.send(results);
  });
  db.end();
});

module.exports = router;
