

 const mongoose = require("mongoose");

 // Schema

 const ExpensesSchema = new mongoose.Schema({
     type: {type: String, required: true},
     date_of_expense: {type: Number, required: true},
     employee_id: {type: String, required: true},
     reimbursed: {type: Boolean, required: true},
     reimbursed_date: {type: Number, required: true}
 },
 {
    timestamps: { created_at: () => Date.now() }
 },
 { versionKey: false }
 )

 const Expenses = mongoose.model("expenses",ExpensesSchema);

 module.exports = Expenses;