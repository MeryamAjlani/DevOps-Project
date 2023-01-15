
const express= require('express')
const router = express.Router();

const actions =require('./Methods/Auth');


router.get('/',(req,res)=>{
    var date = new Date()
    res.send('batta')
})

router.post('/login',actions.login)
router.post('/register',actions.register)



module.exports = router