var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// const { dump } = require('dumper.js');

// Destructuring
var dbData = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
};

/* GET roles listing. */
router.get('/', function(req, res, next) {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query('SELECT * FROM `roles_instructions`', (error, results, fields) => {
    if (error) {
      console.error(error);
    }
    // throw error;
    res.send(results);
  });
  db.end();
});


module.exports = router;
