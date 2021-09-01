var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// const { dump } = require('dumper.js');

// Destructuring
var { db } = require('../database/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.connect();
  db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
  db.end();
});

module.exports = router;
