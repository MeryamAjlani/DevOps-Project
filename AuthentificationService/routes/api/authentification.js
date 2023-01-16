const mongoose = require("mongoose");
const express=require('express');
const router=express.Router();
const { User, addNewUser, deleteUser ,updateUser, login} = require("../../database/user")


router.post('/login', async(req, res) => { 
  fUser =await login(req.body.email,req.body.password);
  console.log(fUser)

      if (fUser === undefined) { 
          return res.status(400).json({ 
              message : "User not found."
          }); 
      } 
      else { 
          if (fUser==false) { 
            return res.status(400).json({ 
              message : "Wrong Password"
          }); 
                      

  
          } 
          else { 
            return res.status(201).json({ 
              user : fUser, 
            }) 
          } 
      } 
  }); 


  //get users
  router.get('/all', async (req,res)=>{
    const users = await User.find();
    res.status(200).json(users);

})

  //get by username
  router.get('/byusername', async (req,res)=>{
    var username= req.body.username;
    const userbyUsername = await User.find({username:username});
    res.status(200).json(userbyUsername);
})

  //get address
  router.get('/byaddress', async (req,res)=>{
    var address= req.body.address;
    const userbyAdress = await User.find({address:address});
    console.log(userbyAdress)
    res.status(200).json(userbyAdress);
})

router.post('/signup',async (req,res)=>{
    console.log(req)
    var username= req.body.username;
    var firstname= req.body.firstname;
    var lastname= req.body.lastname;
    var address= req.body.address;
    var password= req.body.password;
    var email= req.body.password;

    addNewUser(username,firstname,lastname,address,password, email);
    res.status(200).json({msg:"user added succussfully"});
 
  });

  router.put('/update',async (req,res)=>{
    console.log(req)
    var username= req.body.username;
    var firstname= req.body.firstname;
    var lastname= req.body.lastname;
    var address= req.body.address;

    updateUser(username,firstname,lastname,roles,address);
    res.status(200).json({msg:"crewmate updated succussfully"});
 
  });


  router.delete('/delete',async (req,res)=>{
    console.log(req)
    var email= req.body.email;
    deleteUser(email);
    res.status(200).json({msg:"crewmate deleted succussfully"});
 
  });



  


module.exports=router;