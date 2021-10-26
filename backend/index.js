
// DEPENDENCIES

const express = require("express");
const app = express();
const port = 3003;
const connection = require('./config/database'); 
// MIDDLEWARE


// CONTROLLERS



// WHITELIST



// ROUTES

app.get("/", (req, res) =>{
    let sql = "SELECT * FROM USERS";
    connection.query(sql, function(err, results){
        if (err) throw err;
        res.send(results)
    })
    
})

// SQL


// LISTENERS

app.listen(port, () => {
    console.log('listening')
    connection.connect(function(err){
        if(err) throw err;
        console.log('database connected');
    })
});
