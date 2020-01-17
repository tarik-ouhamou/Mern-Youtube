const express=require('express');
const app=express();
const cors=require('cors');
const config=require('config');

app.use(express.json());
app.use(cors());
app.use('/mp3',express.static(__dirname+'/mp3'));
app.use('/mp4',express.static(__dirname+'/mp4'));
const PORT=config.get("PORT")||5000;


app.use('/download',require('./routes/download'));

app.listen(PORT,()=>{
    console.log(`Server Listening at port ${PORT}...`);
})