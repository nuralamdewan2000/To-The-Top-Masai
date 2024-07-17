const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
const {userModel} =require('../model/userModel');
const {BlackTokenModel} =require('../model/token.model');
require('dotenv').config();

const register =async(req,res) =>{
    try{
        const{name,email,password,role} =req.body;
        const existingUser =await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({msg:'User already exists'});

        }

        const hashedpass = await bcrypt.hash(password,8);
        const user =new userModel({name,email,password:hashedpass,role});
        await user.save();
        res.status(201).send({ message: 'User registered successfully',User:`${name}` });


    }catch(err){
        res.status(500).send({msg:'Error in user Registration',error:err})
    }
}



const login =async(req,res) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send({ msg: 'Invalid credentials' });
        }

        bcrypt.compare(password,user.password, (err,result) =>{
            if(result){
                const token = jwt.sign({userId:user._id,author:user.email},process.env.tokenSecretKey,{expiresIn:'1d'})
                res.status(200).send({msg:'login successfully',token,username: user.email,userId:user._id})
            }else{
                return res.status(401).send({ error: "Wrong password." });
            }
        })


    }catch(err){
        res.status(500).send({msg:'Error in User Login',error:err})
    }
}