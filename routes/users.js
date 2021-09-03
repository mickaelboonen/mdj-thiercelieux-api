var express = require('express');
var router = express.Router();
var auth = require('express-jwt-token');
const bcrypt = require('bcrypt');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
// const { dump } = require('dumper.js');

// Destructuring
var { dbData } = require('../database/db');

router.all('/login', auth.jwtAuthProtected);
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

/* GET users listing. */
router.post('/check_auth', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {username, password} } = req;
  db.query(`SELECT * FROM users WHERE name = '${username}' OR email = '${username}'`, (error, results, fields) => {
    if (error) throw error;
    const token = generateAccessToken({ username: username });

    bcrypt.compare(password, results[0].password, function(err, result) {
      if (result) {
        const data = {};
        data.id = results[0].id;
        data.token = token;
        res.send(data);
      }
      else {
        const message = 'Message d\'erreur pour la connexion.'
        res.send(message);
      }
    });
    
  });
  db.end();
});
/* GET users listing. */
// router.post('/login', (req, res, next) => {
//   const db = mysql.createConnection(dbData);
//   db.connect();
//   const { body: {username, password} } = req;
//   db.query(`SELECT * FROM users WHERE name = '${username}' OR email = '${username}'`, (error, results, fields) => {
//     if (error) throw error;
//     console.log(results);
//     res.send(results)
//   });
//   db.end();
// });















router.post('/create', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {username, email, password, avatar} } = req;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const hashedPassword = hash;
    const sqlUpdateRequest = `INSERT INTO \`users\` (\`name\`, \`email\`, \`password\`, \`avatar\`) VALUES ('${username}', '${email}', '${hashedPassword}', '${avatar}')`;

    db.query(`SELECT * FROM users WHERE name = '${username}'`, function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        db.query(`SELECT * FROM \`users\` WHERE \`email\` = '${email}'`, (error, results, fields) => {
          if (error) throw error;
          console.log(email, results);
          if (results.length === 0) {
            db.query(sqlUpdateRequest, (error, results, fields) => {
              if (error) throw error;
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
