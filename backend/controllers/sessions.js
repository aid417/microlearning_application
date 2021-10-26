// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');


// ROUTES


/********   CREATE   ************/
router.post("/", (req,res) => {
    user_name = req.body.user_name;
    password = req.body.password;
    sql_query = 'SELECT * FROM USERS where user_name = ?';
    connection.query(sql_query, user_id, function(err, results){
        if(password == results[0].password){
            req.session.currentUser = results[0]
            console.log('session started')
            res.status(200).json({ results[0]})
        }else{
            res.status(400).json({ error: err.message });
        }
                // if (err){
                //     res.status(400).json({error: err.message});
                // }
                // res.status(200).json({results});
                // console.log(results)
                // if (err) throw err;
                // res.send(results)
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