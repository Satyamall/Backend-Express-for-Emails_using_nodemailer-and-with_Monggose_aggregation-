
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const connect = require('./config/db');
const Expenses = require('./models/expenses.model');
const Employees = require('./models/employees.model');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    auth: {
        user: "507ddc9ad28023",
        pass: "f58d2bd6a26fe7"
    },
    port: 465,
    secure: false
  });

const message = {
    from: "noreply@satya.com",
    to: "arjun@gmail.com",
    subject: "Hello",
    text: "Hello world"
}

// mailtrap

app.use(cors());
app.use(express.json());

app.get("/email", async(req,res)=>{
    try{
        transporter.sendMail(message,(err)=>{
            if(err){
                res.send(err);
            }
            res.status(201).send("Successfully send email")
        })
    }
    catch(err){
        res.status(500).json({msg: "Something went wrong"});
    }
})



app.get("/employees", async(req,res)=>{
    try{
        const expenses = await Employees.find({});
        if(!expenses) return res.status(400).json({msg: "No Expenses found!"})
        res.status(200).json(expenses);
    }
    catch(err){
        res.status(400).json({msg: "Something went wrong!"})
    }
})

app.get("/", async(req,res)=>{
    try{
        const expenses = await Expenses.find({});
        if(!expenses) return res.status(400).json({msg: "No Expenses found!"})
        res.status(200).json(expenses);
    }
    catch(err){
        res.status(400).json({msg: "Something went wrong!"})
    }
})

app.get("/expenses-grouped", async(req,res)=>{
    try{
        const expenses = await Expenses.aggregate([

            // {
            //    $group: {
            //        _id: "$type",
            //        total: { $sum: "$reimbursed_date"},
            //        average: { $avg: "$reimbursed_date"},
            //        users: { $addToSet: "$type"},
            //     //    users: { $addToSet: "$employee_id"},
            //    }                
            // },
            // {
            //     $unwind: {
            //         path: "$users"
            //     }
            // }


            {
                $lookup: {
                    from: "employees",
                    localField: "employee_id",
                    foreignField: "employee_id",
                    as: "employee"
                }
            },
            // {
            //     $project: {
            //         type: 1,
            //         employee: 1
            //     }
            // },
            {
                $unwind: {
                    path: "$employee"
                }
            },
            {
                $group: {
                    _id: "$employee.name",
                    reimbursed_date: {
                        $sum: "$reimbursed_date"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1,
                    reimbursed_date: -1,
                    _id: -1
                }
            }
        ]);
        if(!expenses) return res.status(400).json({msg: "No Expenses found!"})
        return res.status(200).json(expenses);
    }
    catch(err){
        res.status(400).json({msg: "Something went wrong!"})
    }
})

const start = async()=>{
    await connect();

    app.listen( "5000", ()=>{
        console.log("Listen on port 5000")
    })
}

start();