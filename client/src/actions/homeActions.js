import {DOWNLOAD_VID, LOADING_VID} from './types';
import axios from 'axios';

export const downloadVideo=(newUrl)=> dispatch =>{
    axios.post("http://localhost:5000/download",newUrl).then(res=>dispatch({
        type:DOWNLOAD_VID,
        payload:res.data
    }));
}

export const loadingVideo=()=>{
    return{
        type:LOADING_VID
    }
}
