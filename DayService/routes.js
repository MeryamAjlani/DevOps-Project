
const express= require('express')
const router = express.Router();

const actions =require('./Methods/day');
const auth = require('./Methods/auth')

router.get('/',(req,res)=>{
    var date = new Date()
    res.send('batta')
})

router.post('/addDay',actions.addDay)
router.post('/getDay',actions.getDay)
router.post('/user',auth.login)



module.exports = router