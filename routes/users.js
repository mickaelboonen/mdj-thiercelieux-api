var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// const { dump } = require('dumper.js');

// Destructuring
var { dbData } = require('../database/db');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.error(error);
    }
    // throw error;
    res.send(results);
  });
  db.end();
});

router.post('/', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {username, email, password, avatar} } = req;
  const sqlRequest = `INSERT INTO \`users\` (\`name\`, \`email\`, \`password\`, \`avatar\`) VALUES ('${username}', '${email}', '${password}', '${avatar}')`;

  db.query(sqlRequest, function (error, results, fields) {
    if (error) throw error;
    console.log('results', results);
    res.send(results);
  });
  db.end();
});


module.exports = router;
