const express =require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());


const connection = mongoose.connect(process.env.mongoUrl);

const userSchema =mongoose.Schema({
    name:String,
    email:String
},{
    versionkey:false
})

const UserModel = mongoose.model('User',userSchema);

app.get('/',(req,res) =>{
    res.status(200).send({msg:'this is the home route'});
})


app.post('/newUser',async(req,res) =>{
    try{
        const {name,email} =req.body;

        const existingUser =await UserModel.findOne({email});
        if(!existingUser){
            const user = new UserModel({name,email});
             await user.save();
             res.status(200).send({mas:`new user created successfully with ${user}`});
        }else{
            res.status(400).send({msg:"user already exists"})
        }

    }catch(err){
        res.status(404).send({msg:"error in adding new user",error:err})
    }
})


app.listen(process.env.port,async() =>{
    try{
        console.log(`server listening on port http://localhost:${process.env.port}`);
        await connection;
        console.log('connected to the database successfully');

    }catch(err){
        console.log(err);
    }
    
})