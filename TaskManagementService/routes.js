
const express= require('express')
const router = express.Router();

const actions =require('./Methods/TodoMethods');



router.post('/addTodo',actions.addTodo)
router.get('/getTodo/:date',actions.getTodo)



module.exports = router