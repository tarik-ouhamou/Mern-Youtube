const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const History=require('../models/History');

router.get('/:id',(req,res)=>{
    const user_id=req.params.id;
    History.find({user_id},(err,docs)=>{
        res.json(docs);
    });
});

module.exports=router;