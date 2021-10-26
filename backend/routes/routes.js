const express = require("express");

const router = express.Router();
const connection = require('../config/database');

router.get('/', (req,res)=>{
    res.send('Welcome to Home Page');
    
});



module.exports = router;