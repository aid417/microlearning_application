
// DEPENDENCIES

const express = require("express");
const app = express();
const port = 3003;
const connection = require('./config/database'); 
// const router = require('./routes/routes');
const session = require("express-session");
const bodyParser = require("body-parser");

// MIDDLEWARE


// CONTROLLERS

const usersController = require("./controllers/users.js");

app.use("/users", usersController);

// WHITELIST



// CONTROLLERS

// app.get("/", (req, res) =>{
//     let sql = "SELECT * FROM USERS";
//     connection.query(sql, function(err, results){
//         if (err) throw err;
//         res.send(results)
//     })
    
// })


// SQL


// LISTENERS

app.listen(port, () => {
    console.log('listening')
    connection.connect(function(err){
        if(err) throw err;
        console.log('database connected');
    })
});
