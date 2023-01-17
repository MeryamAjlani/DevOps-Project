const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:String
    },
    description:{
        type:String
    },
    status: {
        type: Boolean,
    },
   
});
const Todo = mongoose.model('todo', ToDoSchema);
module.exports = Todo;