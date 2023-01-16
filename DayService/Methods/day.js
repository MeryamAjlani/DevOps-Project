const express = require("express");
const mongoose = require("mongoose");
const Day = require("../Models/DayModel");
const Todo = require("../Models/TodoModel");

const promMid = require('express-prometheus-middleware');

module.exports = {

       getDay: async (req,res,next)=>{
        httpCounter.inc({ method: req.method, path: req.path });
         try { 
         const {date,user} = req.body
          //
         const dates= await Day.find({date:date})
         
         
          fetch(`http://localhost:3000/getTodo/${date}`).then(async (res2)=>{
            
          console.log("this is res 2 :" ,res2)
        return res.send({dates:dates,todos: await Todo.find({date:date})})
        })
          
          }
      catch(e){
        console.log(e)
      }
    },

   addDay:async(req,res,next)=>{
    try {
    const  { date, rate,userId}=req.body
    const newDate=await Day.create({date:date,rate:rate,userId:userId});
    return res.send(newDate)
     
    } catch (err) {
      console.log(err);
    }
   }
}