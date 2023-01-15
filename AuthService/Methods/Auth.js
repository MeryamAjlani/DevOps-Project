const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User=require('../Models/UserModel')
const bcrypt= require("bcrypt")
module.exports = {

        login: async (req,res,next)=>{
          let { email, password } = req.body;
 
          let existingUser;
          try {
            existingUser = await User.findOne({ email: email });
          } catch {
            const error = new Error("Error! Something went wrong.");
            return next(error);
          }
         
          let token;
          try {
            //Creating jwt token
            token = jwt.sign(
              { userId: existingUser.id, email: existingUser.email },
              "secretkeyappearshere",
              { expiresIn: "1h" }
            );
          } catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            return next(error);
          }
         
          res
            .status(200)
            .json({
              success: true,
              data: {
                userId: existingUser.id,
                email: existingUser.email,
                token: token,
              },
            });

      
    },

   register:async(req,res,next)=>{
    try {
      // Get user input
      const { email, password} = req.body;
  
      // Validate user input
      if (!(email && password )) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
   }
}