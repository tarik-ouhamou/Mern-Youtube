import {HISTORY_LOADING,HISTORY_LOADED} from "../actions/types";

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
        default:
            return{
                state
            }
    }
}