import {DOWNLOAD_VID,LOADING_VID} from '../actions/types';

const initialState={
    linkMp3:'',
    linkMp4:'',
    videoNameMp3:'',
    videoNameMp4:'',
    title:'',
    description:'',
    thumbnail:'',
    loading:false
}

export default function(state=initialState,action){
    switch(action.type){
        case LOADING_VID:
            return{
                ...state,
                loading:true
            }
        case DOWNLOAD_VID:
            return{
                linkMp3:action.payload.linkMp3,
                linkMp4:action.payload.linkMp4,
                videoNameMp3:action.payload.linkMp3.split("http://localhost:5000/mp3/"),
                videoNameMp4:action.payload.linkMp4.split("http://localhost:5000/mp4/"),
                title:action.payload.title,
                description:action.payload.description,
                thumbnail:action.payload.thumbnail,
                loading:false
            }
        default:
            return{
                state
            }
    }
}