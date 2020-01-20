const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const History=require('../models/History');

router.get('/:id',(req,res)=>{
    const user_id=req.params.id;
    History.find({user_id},(err,docs)=>{
        if(err) throw err;
        res.json(docs);
    });
});

router.delete('/:id',(req,res)=>{
    const _id=req.params.id;
    History.findByIdAndRemove({_id},(err,doc)=>{
        if(err) throw err;
        res.json(doc);
    });
});

router.get('/:id/:title',(req,res)=>{
    const title=req.params.title;
    const user_id=req.params.id;
    History.find({user_id,title},(err,docs)=>{
        if(err) throw err;
        res.json(docs);
    });
});

module.exports=router;