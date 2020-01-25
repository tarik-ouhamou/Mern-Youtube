import {LOADING_PLAYLIST,PLAYLIST_LOADED} from '../actions/types';

const initialState={
    videos:[],
    isLoading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_PLAYLIST:
            return{
                ...state,
                isLoading:true
            }
        case PLAYLIST_LOADED:
            return{
                videos:action.payload,
                isLoading:false
            }
        default:
            return {
                state
            }
    }
}