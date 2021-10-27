
// DEPENDENCIES

const express = require("express");
const app = express();
const port = 3003;
const connection = require('./config/database'); 
// const router = require('./routes/routes');
const session = require("express-session");
const bodyParser = require("body-parser");
// const cors = require("cors");
// MIDDLEWARE


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


// WHITELIST
// const whitelist = ["http://localhost:3000", "http://localhost:3003"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };
app.use(express.json());
// app.use(cors(corsOptions));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



app.use("/users", usersController);



app.use("/sessions", sessionsController);
app.use("/usercourses", usercoursesController);
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
