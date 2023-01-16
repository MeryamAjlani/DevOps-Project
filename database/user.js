const mongoose = require("mongoose");
var crypto = require('crypto'); 

const Userschema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      password:{
        type: String,
        required: true
      },
      salt: {
        type: String,
        required: true
      },

      address: {
        type: String,
        required: false,
      },
      email:{
        type: String,
        required:true
      },
      loggedin: {
        type: String,
        required: false,
      }
    });


  const addNewUser = async (username,firstname,lastname,address,password,email) => {
    salt = crypto.randomBytes(16).toString('hex');         
    hashedPassword = crypto.pbkdf2Sync(password, salt,1000, 64, `sha512`).toString(`hex`)
    const newUser = await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      address: address,
      salt:salt,
      password: hashedPassword,
      email:email
    });
    newUser.save();
  
  };



  const updateUser = async (username,firstname,lastname,address) => {
   
    const user = await User.updateOne(
      {username:username},
      { firstname: firstname,
        lastname: lastname,
        address: address}
      );
  
    user.save();
  
  };


     
   const login = async function(email,password) { 
      const fetchedUser= await User.findOne({ email : email });
      if (fetchedUser!=null ){ 
        var hash = crypto.pbkdf2Sync(password, fetchedUser.salt, 1000, 64, `sha512`).toString(`hex`);
        if(fetchedUser.password === hash) 
          return fetchedUser
        else return false
      }; 
   }




  const deleteUser = async (email) => { 
    const user = await User.deleteOne({email: email})
  }


  const User = mongoose.model("Users", Userschema);

  module.exports = { User, addNewUser, deleteUser ,updateUser,login} ; 

