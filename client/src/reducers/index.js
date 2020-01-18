import {combineReducers} from 'redux';
import HomeReducer from './homeReducer';
import AuthReducer from './authReducer';
import ErrorReducer from './errorReducer';

export default combineReducers({
    home:HomeReducer,
    auth:AuthReducer,
    error:ErrorReducer
});