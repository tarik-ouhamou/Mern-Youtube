import {LOADING_PLAYLIST,PLAYLIST_LOADED} from './types';
import axios from 'axios';

export const loadingPlaylist=()=>{
    return{
        type:LOADING_PLAYLIST
    }
}

export const getPlaylist=(url,user_id)=>dispatch=>{
    dispatch({
        type:LOADING_PLAYLIST
    });
    const info={
        url,
	    user_id
    }
    axios.post('http://localhost:5000/download/playlist',info).then(res=>{
        console.log(res);
        dispatch({
            type:PLAYLIST_LOADED,
            payload:res.data
        });
    }).catch(err=>{
        console.log(err);
    });
}