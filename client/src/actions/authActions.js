import axios from "axios";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from './types';
  import {returnErrors} from './errorActions';

  export const loadUser=()=> (dispatch,getState) =>{
    dispatch({type:USER_LOADING});
    axios.get('http://localhost:5000/auth/user',tokenConfig(getState))
    .then(user=>{
        dispatch({
            type:USER_LOADED,
            payload:user
        });
    }).catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status));
        dispatch({
            type:AUTH_ERROR
        });
    });
  }

  export const register=({username,email,password,confirmPass})=>dispatch=>{
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    const body=JSON.stringify({username,email,password,confirmPass});
    axios.post('http://localhost:5000/users',body,config)
    .then(res=>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
    }).catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({type:REGISTER_FAIL});
    });
  }

  export const login=({email,password})=>dispatch=>{
    const config={
      headers:{
          'Content-type':'application/json'
      }
    }
    const body=JSON.stringify({email,password});
    axios.post('http://localhost:5000/auth',body,config).then(res=>{
      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      });
    }).catch(err=>{
      dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
      dispatch({
        type:LOGIN_FAIL
      })
    });
  }

  export const logout=()=>{
    return{
      type:LOGOUT_SUCCESS
    }
  }


  export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };