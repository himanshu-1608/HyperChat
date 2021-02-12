
import * as actionTypes from './actionTypes';
import axios, { setAuthorizationHeader } from '../axios';
import { clearUserData, clearGeneralData } from './index';

export const registerUser = (user) => dispatch => {
    axios.post('/auth/user/register', user)
    .then(result => {
        const { user, token } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setLogin(user, token));
    })
    .catch(err => console.log(err));
}

export const loginUser = (user) => dispatch => {
    axios.post('/auth/user/login', user)
    .then((result) => {
        const { user, token } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setLogin(user, token));
    })
    .catch((err) => console.log(err));;
}

export const setLogin = (user, token) => {
    setAuthorizationHeader(token);
    return {
        type: actionTypes.SET_LOGIN,
        payload: {
            user: {...user},
            token: token
        }
    }
}

export const setLogout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(clearAuthData());
    dispatch(clearUserData());
    dispatch(clearGeneralData());
}

export const clearAuthData = () => {
    return {
        type: actionTypes.CLEAR_AUTH_DATA
    }
}





