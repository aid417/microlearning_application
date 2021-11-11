// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');
const { exec } = require('child_process'); // native in nodeJs
const fs = require('fs')

// ROUTES

// router.get("/", (req,res)=>{
//     res.send('hello')
// })
/********   GET   ************/
router.get("/:user_name", (req,res) => {
    f
    user_id = req.params.user_name;
    sql_query = 'SELECT * FROM USERS where user_name = ?;';
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
  
    console.log(req.body);
  
    let new_user = {
        "Command": "ENCRYPT",
        "Target": [req.body.password, "Password"]
    }

   
        
    const check_data = async(data) => {
     let new_data = await JSON.parse(data)
     console.log(new_data)
     writing()
     
  
    }
    let check_file = async() =>{
        fs.readFile('./EncryptionServiceInput.json',  (err, data)=>{

            if(err){
                console.log('error reading file from disk', err)
            }else{
                if(data){
                    check_data(data)
                }
                
                }
            
        })}
    

    const reading_file = async() =>{
        await new Promise(resolve => setTimeout(resolve, 1000));
        fs.readFile('./EncryptionServiceOutput.json',  (err, data)=>{

            if(err){
                console.log('error reading file from disk', err)
            }
            else{
           
                encrypted_pw = JSON.parse(data)
                
                data = [req.body.first_name, req.body.last_name, req.body.username, encrypted_pw['Target']];
                        console.log(data)
                        sql_query = 'INSERT INTO USERS (first_name, last_name, user_name,password) VALUES (?, ?, ?, ?);';
                        connection.query(sql_query, data, function(err, results){
                            if (err){
                                res.status(400).json({error: err.message});
                            }
                            else{
                                res.status(200).json({results});
                                console.log(results)
                            }
                         
                        });
               return
        }})
    }

   
    const output = async() =>{
       console.log('output')
        await reading_file()
    //    console.log(new_pw, 'new password')
    }
  
    const writing = async()=> {
        console.log('hit')
            await exec('./EncryptionService')
            output()
        
        
    }
    const write_to_json = async()=> {
        fs.writeFile("./EncryptionServiceInput.json", JSON.stringify(new_user), err =>{
            if (err) {
                    throw err;
            }else{
                    check_file()
            }
                
        })
    }
    const start_writing = async()=>{
        // await exec('touch EncryptionServiceOutput.json')
        write_to_json()
       
    }
    start_writing();
    // write_file().then(output())
    // output()
    


   
   
});

/********   DELETE   ************/




module.exports = router;