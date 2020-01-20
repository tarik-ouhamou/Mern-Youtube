import {HISTORY_LOADING,HISTORY_LOADED} from './types';
import axios from 'axios';

export const loadHistory=(id)=>dispatch=>{
    dispatch({type:HISTORY_LOADING});
    axios.get(`http://localhost:5000/history/${id}`).then(res=>{
        console.log(res);
        dispatch({
            type:HISTORY_LOADED,
            payload:res.data
        });
    });
    
}