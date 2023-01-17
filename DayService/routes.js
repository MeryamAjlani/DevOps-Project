
const express= require('express')
const router = express.Router();

const actions =require('./Methods/day');
const auth = require('./Methods/auth')

router.get('/date/new',(req,res)=>{
    var date = new Date()
    res.send('batta')
})

router.post('/date/addDay',actions.addDay)
router.post('/date/getDay',actions.getDay)
router.post('/date/user',auth.login)



module.exports = router