var express = require('express');
var router = express.Router();
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123Aa@',
  database: 'nhakhoa'
})
connection.connect()

/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from bacsi', (err, rows, fields) => {
      if (err) throw err
      res.json({data:rows});
    })
    
    connection.end()
    
});

module.exports = router;
