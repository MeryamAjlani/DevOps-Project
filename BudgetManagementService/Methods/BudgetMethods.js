const createError = require('http-errors')
const Todo=require('../Models/BudgetModel')
const e = require('express')


module.exports = {

        getTodo: async (req,res,next)=>{
         
       try{
        console.log("getting Todos By Date");
        const result=req.body
        const items= await Todo.find({date:result.date,userId:req.session.userId})
        console.log(items)
       res.send(items)
       }
       catch(e){
        console.log(e)
       }
    },

    addTodo:async(req,res,next)=>{
  
      try{
        console.log("getting Todos By Date");
        const result=req.body
        for(todo in result.todos){
          todo["userId"]=req.session.userId
          await Todo.insert(todo)
        }
       res.send("todos added")
       }
       catch(e){
        console.log(e)
       }
    }
}