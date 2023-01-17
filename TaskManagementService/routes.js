
const express= require('express')
const router = express.Router();

const actions =require('./Methods/TodoMethods');



router.post('/todo/addTodo',actions.addTodo)
router.get('/todo/getTodo/:date',actions.getTodo)



module.exports = router