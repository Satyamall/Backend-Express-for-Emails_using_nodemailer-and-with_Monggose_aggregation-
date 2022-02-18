
const mongoose=require('mongoose');

const connect=()=>{
    return mongoose.connect("mongodb://localhost:27017/expense_tracker")
}

module.exports=connect;