import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import AuthReducer from './authReducer';
import ErrorReducer from './errorReducer';
import HistoryReducer from './historyReducer';
import PlaylistReducer from './playlistReducer';

export default combineReducers({
    home:HomeReducer,
    auth:AuthReducer,
    error:ErrorReducer,
    history:HistoryReducer,
    playlist:PlaylistReducer
});