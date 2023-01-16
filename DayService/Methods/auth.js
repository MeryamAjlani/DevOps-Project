
const promMid = require('express-prometheus-middleware');
const axios=require('axios')

module.exports = {

       login: async (req,res,next)=>{
        console.log(req.body)
        console.log("ba3")
        axios.post('http://localhost:5000/authentification/login', {
            email:req.body.email ,
            password: req.body.password
          })
          .then(function (response) {
            console.log(response);
            return res.send(response)
          })
          .catch(function (error) {
            console.log(error);
          });
    },

}