
import * as actionTypes from './actionTypes';
import axios from '../axios';

export const registerUser = (user) => dispatch => {
    axios.post('/user/registerNewUser', user)
    .then(result => {
        const { user, token } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setLogin(user, token));
    })
    .catch(err => console.log(err));
}

export const loginUser = (user) => dispatch => {
    axios.post('/user/loginUser', user)
    .then((result) => {
        const { user, token } = result.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setLogin(user, token));
    })
    .catch((err) => console.log(err));;
}

export const setLogin = (user, token) => {
    return {
        type: actionTypes.SET_LOGIN,
        payload: {
            user: {...user},
            token: token
        }
    }
}

export const setLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: actionTypes.SET_LOGOUT
    }
}

