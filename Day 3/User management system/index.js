const express = require('express');
const {connection } =require('./config/db');
require('dotenv').config();

const app = express();

app.use(express.json());


app.get('/',(req,res) =>{
    res.status(200).send({msg:"Welcome to User Management System"});
})


app.listen(process.env.port, async() =>{
    try{
        console.log(`server running on port http://localhost:${process.env.port}`);
        await connection;
        console.log("connected to the database successfully");

    }catch(err){
        console.log(`err`);
    }
})