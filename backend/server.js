
// DEPENDENCIES

const express = require("express");
const app = express();
const port = 3003;
const connection = require('./config/database'); 
const session = require("express-session");
const bodyParser = require("body-parser");


// CONTROLLERS


app.use(
    session({
      secret: "feedmeseymour", //some random string
      resave: false,
      saveUninitialized: false
    })
  );

const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const usercoursesController = require("./controllers/usercourses");
const modulesController = require("./controllers/modules");


app.use(express.json());




app.use("/users", usersController);



app.use("/sessions", sessionsController);
app.use("/usercourses", usercoursesController);
app.use("/modules", modulesController);





// LISTENERS

app.listen(port, () => {
    console.log('listening')
    connection.connect(function(err){
        if(err) throw err;
        console.log('database connected');
    })
});
