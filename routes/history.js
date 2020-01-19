const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const History=require('../models/History');

router.get('/',(req,res)=>{
    const {user_id}=req.body;
    
});

module.exports=router;