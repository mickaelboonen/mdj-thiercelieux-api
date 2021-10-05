var express = require('express');
var router = express.Router();
var auth = require('express-jwt-token');
const bcrypt = require('bcrypt');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
// import { insertInto } from '../requests/insert';
// const { dump } = require('dumper.js');

// Destructuring
var { dbData } = require('../database/db');

// router.all('/login', auth.jwtAuthProtected);

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  console.log(123456);
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]


  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

/* GET users listing. */
router.post('/check_auth', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  const { body: {username, password} } = req;

  db.connect();
  db.query(`SELECT * FROM users WHERE pseudo = '${username}' OR email = '${username}'`, (error, results, fields) => {
    if (error) throw error;
    // If an user is found
    if (results.length > 0) {
      // We generate a token
      const token = generateAccessToken({ username: username });
      // We use bcrypt compare function to see if the current password, once hashed, matches the hashed password registered in the db
      bcrypt.compare(password, results[0].password, function(err, result) {
        // If there's a match, we send the id of the user, the token and the 200 status code.
        if (result) {
          const data = {};
          data.id = results[0].id;
          data.token = token;
          data.status = 200;
          res.send(data);
        }
        // If there isn't a match, we send an error message and the 403 status code.
        else {
          const data = {};
          data.message = 'Vos identifiants et mots de passe ne correspondent pas. Veuillez réessayer.';
          data.status = 403;
          res.send(data);
        }
      });
    }
    // If we don't find a user matching the current username, we send an error message and the 403 status code.
    else {
      const data = {};
      // The message is the same for both case for more security. We give as little information as possible about the error.
      data.message = 'Vos identifiants et mots de passe ne correspondent pas. Veuillez réessayer.';
      data.status = 403;
      console.log(data);
      res.send(data);
    }
  });
  db.end();
});

/* GET users listing. */
router.post('/login', authenticateToken, (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {id} } = req;
  db.query(`SELECT * FROM users WHERE id=${id}`, (error, results, fields) => {

    // TODO : 
    // Inner Join and co 
    if (error) throw error;
    res.send(results)
  });
  db.end();
});

router.post('/create', (req, res, next) => {
  const db = mysql.createConnection(dbData);
  db.connect();
  const { body: {username, email, password, avatar} } = req;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const hashedPassword = hash;
    const sqlCreateRequest = `INSERT INTO \`users\` (\`pseudo\`, \`email\`, \`password\`, \`avatar\`) VALUES ('${username}', '${email}', '${hashedPassword}', '${avatar}')`;
    console.log(sqlCreateRequest);
    db.query(`SELECT * FROM users WHERE pseudo = '${username}'`, function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        db.query(`SELECT * FROM \`users\` WHERE \`email\` = '${email}'`, (error, results, fields) => {
          if (error) throw error;
          
          if (results.length === 0) {
            db.query(sqlCreateRequest, (error, results, fields) => {
              if (error) throw error;

              db.query(`SELECT \`id\` FROM \`users\` WHERE \`pseudo\` = '${username}'`, (error, results, fields) => {
                if (error) throw error;

                console.log(results.length, results, results[0].id);
                if (results.length > 0) {
                  db.query(`INSERT INTO \`stats\` (\`user_id\`) VALUES (${results[0].id})`, (error, results, fields) => {
                      if (error) throw error;
                      console.log(results);

                      const message = 'Inscription réussie !';
                      res.send(message);
                      db.end();
                  })
                }

              })

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
