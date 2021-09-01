var express = require('express');
var router = express.Router();
// const { dump } = require('dumper.js');

// Destructuring
var { db } = require('../database/db');

/* GET roles listing. */
router.get('/', function(req, res, next) {
  db.connect();
  db.query('SELECT * FROM roles', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
  db.end();
});

module.exports = router;
