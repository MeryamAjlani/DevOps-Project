const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:{
        type:Date
    },
    description:{
        type:String
    },
    amont: {
        type: Number,
    },
   
});
const Budget = mongoose.model('budget', BudgetSchema);
module.exports = Budget;