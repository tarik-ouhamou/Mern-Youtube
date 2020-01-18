const express=require('express');
const router=express.Router();
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config=require('config');
const auth=require('../middleware/auth');

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

//to verify the user by token
router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id).then(user=>{
        res.json(user);
    });
});
module.exports=router;