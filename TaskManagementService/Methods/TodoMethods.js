const createError = require('http-errors')
const Todo=require('../Models/TodoModel')
const e = require('express')
const{ httpCounter,todosByUserHistogram,retodoCounter,todoCounter}=require('../Monitoring/metrics')

module.exports = {

        getTodo: async (req,res,next)=>{
          //childLogger.info('Getting tweets by user id', { request_id: req.headers['x-request-id']})
         httpCounter.inc({ method: req.method, path: req.path });

       try{
        console.log("getting Todos By Date for user ");
        const result=req
        console.log("this is the second service",result)
        const items= await Todo.find({date:result.params.date})
        todoCounter.inc({
          date:result.params.date
      });
        todosByUserHistogram.observe(items.length);
        console.log(items)
      return  res.send(items)
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
      return res.send("todos added")
       }
       catch(e){
        console.log(e)
       }
    }
}