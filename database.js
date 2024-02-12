var mysql = require('mysql')
const dotenv = require('dotenv').config()

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

module.exports = connection;
