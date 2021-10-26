// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');


// ROUTES

// router.get("/", (req,res)=>{
//     res.send('hello')
// })
/********   GET   ************/
router.get("/:user_name", (req,res) => {
    user_id = req.params.user_name;
    sql_query = 'SELECT * FROM USERS where user_name = ?';
    connection.query(sql_query, user_id, function(err, results){
                if (err){
                    res.status(400).json({error: err.message});
                }
                res.status(200).json({results});
                // console.log(results[0].user_id)
                // if (err) throw err;
                // res.send(results)
            });
});

/********   CREATE   ************/


/********   DELETE   ************/




module.exports = router;