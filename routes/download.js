const express=require('express');
const router=express.Router();
const youtubedl=require('youtube-dl');
const fs=require('fs');
const ffmpeg=require('fluent-ffmpeg');
const History=require('../models/History');
const timeout=require('connect-timeout');

router.post('/',timeout('3600s'),(req,res)=>{
    const {url,user_id}=req.body;
    let title='';
    let description='';
    let thumbnail='';
    let fileName;
    const video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })

    //get informations about the video
    youtubedl.getInfo(url,[], function(err, info) {
        if (err) throw err
        title=info.title;
        description=info.description;
        thumbnail=info.thumbnail;
        // Will be called when the download starts.
        video.on('info', function(info) {
            fileName=info._filename.split('.')[0];
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size);
            video.pipe(fs.createWriteStream(`mp4/${fileName}.mp4`));
            console.log("finished");
            proc = new ffmpeg({source:video});
            proc.setFfmpegPath('C:/Users/Tarik Ouhamou/Desktop/ffmpeg/bin/ffmpeg.exe');
            proc.saveToFile(`./mp3/${fileName}.mp3`, (stdout, stderr)=>{
                console.log("All done and clear");
            });
            history=new History({
                user_id,
                fileName,
                description,
                title,
                thumbnail
            });
            history.save().then(user=>{
                console.log("saved in db");
            });
            
        });
      });

      video.on("end",()=>{
          //route response
        res.json({
            linkMp3:`http://localhost:5000/mp3/${fileName}`,
            linkMp4:`http://localhost:5000/mp4/${fileName}`,
            title,
            description,
            thumbnail
        });
      })
    
});


//playlist
/*router.post('/playlist',timeout('36000s'),(req,res)=>{
    const {url,user_id,s}=req.body;
    let compt=0;
    let response=[];
    let title='test';
    let description='test';
    let thumbnail='test';
    let fileName;
    function playlist(url,user_id,s) {
        'use strict'
        let urlPartial=url+"&index="+compt;
        console.log(urlPartial);
        const video = youtubedl(url);
        const videoPartial = youtubedl(urlPartial,
            // Optional arguments passed to youtube-dl.
            ['--format=18'],
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: __dirname });
    
        video.on('error', function error(err) {
            console.log('error 2:', err);
        });
    
        let size = 0;
        youtubedl.getInfo(urlPartial,[], function(err, info) {
            if (err) throw err
            title=info.title;
            description=info.description;
            thumbnail=info.thumbnail;
            // Will be called when the download starts.
            video.on('info', function(info) {
                fileName=info._filename.split('.')[0];
                console.log('Download started')
                console.log('filename: ' + info._filename)
                console.log('size: ' + info.size);
                video.pipe(fs.createWriteStream(`mp4/${fileName}.mp4`));
                console.log("finished");
                proc = new ffmpeg({source:videoPartial});
                proc.setFfmpegPath('C:/Users/Tarik Ouhamou/Desktop/ffmpeg/bin/ffmpeg.exe');
                proc.saveToFile(`./mp3/${fileName}.mp3`, (stdout, stderr)=>{
                    console.log("All done and clear");
                });
                history=new History({
                    user_id,
                    fileName,
                    description,
                    title,
                    thumbnail
                });
                history.save().then(user=>{
                    console.log("saved in db");
                });
                
            });
          });

          video.on("end",()=>{
            compt++;
            response.push({
                linkMp3:`http://localhost:5000/mp3/${fileName}`,
                linkMp4:`http://localhost:5000/mp4/${fileName}`,
                title,
                description,
                thumbnail
            });
            if(compt===s){
                res.send(reponse);
            }
          });
          
        let pos = 0;
        video.on('data', function data(chunk) {
            pos += chunk.length;
            // `size` should not be 0 here.
            if (size) {
                let percent = (pos / size * 100).toFixed(2);
                process.stdout.cursorTo(0);
                process.stdout.clearLine(1);
                process.stdout.write(percent + '%');
            }
        });
    
        video.on('next', playlist);
    }
    playlist(url,user_id,s);
});*/

//playlist v2

router.post("/playlist",timeout('36000s'),(req,res)=>{
    const {user_id,linkList}=req.body;
    let response=[];
    let compt=0;
    for(i=0;i<linkList.length;i++){
        let title='';
        let description='';
        let thumbnail='';
        let fileName;
        const video = youtubedl(linkList[i],
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname })

        //get informations about the video
        youtubedl.getInfo(linkList[i],[], function(err, info) {
            if (err) throw err
            title=info.title;
            description=info.description;
            thumbnail=info.thumbnail;
            // Will be called when the download starts.
            video.on('info', function(info) {
                fileName=info._filename.split('.')[0];
                console.log('Download started')
                console.log('filename: ' + info._filename)
                console.log('size: ' + info.size);
                video.pipe(fs.createWriteStream(`mp4/${fileName}.mp4`));
                console.log("finished");
                proc = new ffmpeg({source:video});
                proc.setFfmpegPath('C:/Users/Tarik Ouhamou/Desktop/ffmpeg/bin/ffmpeg.exe');
                proc.saveToFile(`./mp3/${fileName}.mp3`, (stdout, stderr)=>{
                    console.log("All done and clear");
                });
                history=new History({
                    user_id,
                    fileName,
                    description,
                    title,
                    thumbnail
                });
                history.save().then(user=>{
                    console.log("saved in db");
                });
                
            });
        });
        video.on("end",()=>{
            response.push({
                linkMp3:`http://localhost:5000/mp3/${fileName}`,
                linkMp4:`http://localhost:5000/mp4/${fileName}`,
                title,
                description,
                thumbnail
            });
            compt++;
            if(compt===linkList.length){
                res.send(response);
            }
        });
    }
});



module.exports=router;