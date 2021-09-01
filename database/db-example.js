var mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'USERNAME',
    password : 'PASSWORD',
    database : 'DATABASENAME'
  });

exports.db = db;