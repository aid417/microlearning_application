// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');


// ROUTES

/********   GET   ************/
router.get("/:id", (req,res) => {
    module_num = req.params.id
    sql_query = 'SELECT * FROM BEGINNERSPANISHCARDS where module_num = ?;';
    connection.query(sql_query, module_num, function(err, results){
                if (err){
                    res.status(400).json({error: err.message});
                }
                else{
                    res.status(200).json({results});
                }
              
             
            });
});



module.exports = router;