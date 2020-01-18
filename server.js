const express=require('express');
const app=express();
const cors=require('cors');
const config=require('config');
const mongoose=require('mongoose');

app.use(express.json());
app.use(cors());
app.use('/mp3',express.static(__dirname+'/mp3'));
app.use('/mp4',express.static(__dirname+'/mp4'));
const PORT=config.get("PORT")||5000;

const mongoURI=config.get("MongoURI");

//mongoose
mongoose.connect(mongoURI,{ useNewUrlParser:true, useCreateIndex:true });

const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("MongoDB database connection established succefully");
});

app.use('/download',require('./routes/download'));
app.use('/users',require('./routes/users'));
app.use('/auth',require('./routes/auth'));

app.listen(PORT,()=>{
    console.log(`Server Listening at port ${PORT}...`);
});