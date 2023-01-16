
const express= require('express')
const router = express.Router();

const actions =require('./Methods/day');


router.get('/',(req,res)=>{
    var date = new Date()
    res.send('batta')
})

router.post('/addDay',actions.addDay)
router.post('/getDay',actions.getDay)



module.exports = router