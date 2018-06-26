const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'systemversionedtable'
  });
  
  connection.connect();
  
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/specs', (req, res) => {
    connection.query('select * from cloud_server_spec', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
      });
    // res.send('spec');
});

app.get('/specs/history', (req, res) => {
    connection.query('select *, DATE_FORMAT(ROW_START, "%Y-%m-%d %H:%i") as ROW_START, DATE_FORMAT(ROW_END, "%Y-%m-%d %H:%i")  as ROW_END from cloud_server_spec FOR SYSTEM_TIME ALL ORDER BY SERVER_NM', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
      });
});

module.exports = app;
