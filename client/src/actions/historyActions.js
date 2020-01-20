import {HISTORY_LOADING,HISTORY_LOADED, HISTORY_DELETED, SEARCH_HISTORY} from './types';
import axios from 'axios';

export const loadHistory=(id)=>dispatch=>{
    dispatch({type:HISTORY_LOADING});
    axios.get(`http://localhost:5000/history/${id}`).then(res=>{
        dispatch({
            type:HISTORY_LOADED,
            payload:res.data
        });
    });
}

export const deleteHistory=(id)=>dispatch=>{
    axios.delete(`http://localhost:5000/history/${id}`).then(res=>{
        dispatch({
            type:HISTORY_DELETED,
            payload:id
        });
    })
}

export const searchHistory=(id,title)=>dispatch=>{
    axios.get(`http://localhost:5000/history/${id}/${title}`).then(res=>{
        dispatch({
            type:SEARCH_HISTORY,
            payload:res.data
        });
    })
}