// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');


// ROUTES


/********   CREATE   ************/
router.post("/", (req,res) => {
    username = req.body.username;
    password = req.body.password;
    sql_query = 'SELECT * FROM USERS where user_name = ?';
    connection.query(sql_query, username, function(err, results){
        if(password == results[0].password){
            req.session.currentUser = results[0]
            console.log('session started')
            res.status(200).json({ results})
        }else{
            res.status(400).json({ error: err.message });
        }
            });
});



/********   DELETE   ************/

router.delete("/", (req, res) => {
    req.session.destroy(error => {
      if (error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(200).json({ message: "session ended" });
      }
      // console.log("session destroyed");
    });
  });


module.exports = router;