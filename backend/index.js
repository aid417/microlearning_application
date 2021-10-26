
// DEPENDENCIES

const express = require("express");
const app = express();
const port = 3003;

// MIDDLEWARE


// CONTROLLERS



// WHITELIST



// ROUTES

app.get("/", (req, res) =>{
    res.send('index page')
})

// SQL


// LISTENERS

app.listen(port, () => {
    console.log('listening')
});
