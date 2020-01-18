const express=require('express');
const router=express.Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('config');

router.get('/',(req,res)=>{
    res.send("users");
});

router.post('/',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({msg:"Enter all fields"});
    }

    User.findOne({email}).then(user=>{
        if(!user) return res.status(400).json({msg:"User don't exist"});

        bcrypt.compare(password,user.password).then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg:"Password doesn't match"});
            jwt.sign(
                {id:user._id},
                config.get("jwtSecret"),
                {expiresIn:3600},
                (err,token)=>{
                    res.json({
                        token,
                        user:{
                            id:user._id,
                            username:user.username,
                            email:user.email
                        }
                    });
                }
            )
        })
    });
    
});
module.exports=router;