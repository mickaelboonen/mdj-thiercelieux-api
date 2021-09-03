var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
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

router.post('/create', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {username, email, password, avatar} } = req;

  bcrypt.hash(password, saltRounds, function(err, hash) {
 
    const hashedPassword = hash;
    const sqlUpdateRequest = `INSERT INTO \`users\` (\`name\`, \`email\`, \`password\`, \`avatar\`) VALUES ('${username}', '${email}', '${hashedPassword}', '${avatar}')`;

    // TODO 
    // email et pseudos uniques

    db.query(`SELECT * FROM users WHERE name = '${username}'`, function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        db.query(`SELECT * FROM \`users\` WHERE \`email\` = '${email}'`, (error, results, fields) => {
          if (error) throw error;
          console.log(email, results);
          if (results.length === 0) {
            db.query(sqlUpdateRequest, (error, results, fields) => {
              const message = 'Inscription réussie !';
              res.send(message);
              db.end();
            })
          }
          else {
            const message = 'Cet email est déjà pris, veuillez en choisir un autre.';
            res.send(message);
          }
        })
      }
      else {
        const message = 'Ce pseudo est déjà pris, veuillez en choisir un autre.';
        res.send(message);
      }
      
    }); 

    

  });
});


module.exports = router;
