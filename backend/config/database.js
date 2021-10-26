// import { Sequelize } from "sequelize";

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'microlearning_app',
    user: 'root',
    password: 'password'
});


module.exports = connection;