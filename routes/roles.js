var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// const { dump } = require('dumper.js');

// Destructuring
var { dbData } = require('../database/db');

/* GET roles listing. */
router.get('/', function(req, res, next) {
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

module.exports = router;
