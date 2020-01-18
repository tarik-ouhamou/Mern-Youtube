const express=require('express');
const router=express.Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('config');

router.post('/',(req,res)=>{
    const {username,email,password,confirmPass}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({msg:"Enter all fields"});
    }
    if(passwod!==confirmPass){
        return res.status(400).json({msg:"Password don't match"});
    }
    User.findOne({email}).then(user=>{
        if(user) return res.status(400).json({msg:"User already exist"});
        let newUser={
            username,
            email,
            password
        }
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save().then(user=>{
                    jwt.sign(
                        {id:user._id},
                        config.get("jwtSecret"),
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err;
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
            })
            
        })
    });
    
});

module.exports=router;