import {HISTORY_LOADING,HISTORY_LOADED, HISTORY_DELETED, SEARCH_HISTORY} from "../actions/types";

const initialState={
    videos:[],
    isLoading:false
}
export default function(state=initialState,action){
    switch(action.type){
        case HISTORY_LOADING:
            return{
                videos:[],
                isLoading:true
            }
        case HISTORY_LOADED:
            return{
                videos:action.payload,
                isLoading:false
            }
        case HISTORY_DELETED:
            return{
                videos:state.videos.filter(video=>video._id!==action.payload),
                isLoading:false
            }
        case SEARCH_HISTORY:
            return{
                videos:action.payload,
                isLoading:false
            }
        default:
            return{
                state
            }
    }
}