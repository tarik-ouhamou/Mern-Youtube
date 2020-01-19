const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const HistorySchema=new Schema({
    user_id:{
        type:String,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    creation_date:{
        type:Date,
        default:Date.now
    }
});

const History=mongoose.model('History',HistorySchema);

module.exports=History;