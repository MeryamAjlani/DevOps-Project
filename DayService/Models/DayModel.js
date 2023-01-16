const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({

    date:{
        type:String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rate:{
        type:Number
    },
    budget:{
        type:[String]
    },
    todo:{
        type:[String]
    }

});
const Day = mongoose.model('Day', DaySchema);
module.exports = Day;