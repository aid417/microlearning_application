// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');


// ROUTES


/********   GET   ************/
router.get("/:id", (req,res) => {
    user_id = req.params.id;
    sql_query = 'SELECT * FROM USERCLASSES where user_id = ?;';
    connection.query(sql_query, user_id, function(err, results){
                if (err){
                    res.status(400).json({error: err.message});
                }
                else{
                    res.status(200).json({results});
                }
              
             
            });
});

/********   CREATE   ************/
router.post("/", (req, res) => {

    data = [req.body.course_id, req.body.user_id]
    // console.log(req.body, 'body');

    // data = [req.body.first_name, req.body.last_name, req.body.username, req.body.password];
   
    sql_query = 'INSERT INTO USERCLASSES (course_id, user_id) VALUES (?, ?);';
    connection.query(sql_query, data, function(err, results){
        if (err){
            res.status(400).json({error: err.message});
        }
        else{
            res.status(200).json({results});
            console.log(results)
        }
     
    });

  });

/********   DELETE   ************/




module.exports = router;