
const express= require('express')
const router = express.Router();

const actions =require('./Methods/BudgetMethods');


router.get('/',(req,res)=>{
    var date = new Date()
    res.send('batta')
})

router.post('/addBudget',actions.addBudget)
router.post('/getBudget',actions.getBudget)



module.exports = router