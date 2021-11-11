// DEPENDENCIES
const express = require("express");
const router = express.Router();
const connection = require('../config/database');
const { exec } = require('child_process'); // native in nodeJs
const fs = require('fs')

// ROUTES


/********   CREATE   ************/
router.post("/", (req,res) => {
    username = req.body.username;

    password = req.body.password;
let user_results = []
  const decrypt_function = async() => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    fs.readFile('./EncryptionServiceOutput.json',  (err, data)=>{

      if(err){
          console.log('error reading file from disk', err)
      }
      else{
        decrypted_pw = JSON.parse(data)['Target']
         console.log(JSON.parse(data)['Target'] == req.body.password)
        if(decrypted_pw == req.body.password){
          req.session.currentUser = user_results[0]
              console.log('session started')
              res.status(200).json({ user_results})
        }else{
         console.log('error')
      
        }
         
  }})
    }
    const check_user = function(pw){
      let new_user = {
        "Command": "DECRYPT",
        "Target": [pw, "Password"]
    }
    console.log(pw)
    fs.writeFile("./EncryptionServiceInput.json", JSON.stringify(new_user), err =>{
      if (err) {
          throw err;
      }else{
        exec('./EncryptionService')
        decrypt_function()
      }
    })
    }
    
    sql_query = 'SELECT * FROM USERS where user_name = ?';
    connection.query(sql_query, username, function(err, results){
      user_results = results
      check_user(results[0].password)
      // console.log(results[0])
        // if(password == results[0].password){
        //     req.session.currentUser = results[0]
        //     console.log('session started')
        //     res.status(200).json({ results})
        // }else{
        //     res.status(400).json({ error: err.message });
        // }
            });
    // const decrypt_function = async() => {

    // }
 
      
      
  // })
    // }
  //   let new_user = {
  //     "Command": "DECRYPT",
  //     "Target": [req.body.password, "Password"]
  // }
 
  
//   exec('./EncryptionService')
//   const read_output = async() =>{
//       fs.readFile('./EncryptionServiceOutput.json',  (err, data)=>{

//     if(err){
//         console.log('error reading file from disk', err)
//     }
//     else{
//        console.log(JSON.parse(data, 'sign in data'))
//        return
// }})
//   }
//   fs.readFile('./EncryptionServiceOutput.json',  (err, data)=>{

//     if(err){
//         console.log('error reading file from disk', err)
//     }
//     else{
//         encrypted_pw = JSON.parse(data)
//         console.log(encrypted_pw)
//         // data = [req.body.first_name, req.body.last_name, req.body.username, encrypted_pw['Target']];
//         //         console.log(data)
//         //         sql_query = 'INSERT INTO USERS (first_name, last_name, user_name,password) VALUES (?, ?, ?, ?);';
//         //         connection.query(sql_query, data, function(err, results){
//         //             if (err){
//         //                 res.status(400).json({error: err.message});
//         //             }
//         //             else{
//         //                 res.status(200).json({results});
//         //                 console.log(results)
//         //             }
                 
//         //         });
//        return
// }})
 
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