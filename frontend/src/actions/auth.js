
import * as actionTypes from './actionTypes';

export const registerUser = (user) => {
    return dispatch => {
        fetch('http://localhost:8080/user/registerNewUser', {
            method: 'POST',
            body: JSON.stringify({
                userName: user.name,
                userEmail: user.email,
                userPassword: user.password,
                userConfirmPassword: user.password,
                userProfilePic: ''
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((result) => result.json())
        .then((result) => {
            const { user, token } = result;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(setLogin(user, token));
        })
        .catch((err) => console.log(err));
    }
}

export const loginUser = (user) => {
    return dispatch => {
        fetch('http://localhost:8080/user/loginUser', {
            method: 'POST',
            body: JSON.stringify({
                userEmail: user.email,
                userPassword: user.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((result) => result.json())
        .then((result) => {
            const { user, token } = result;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(setLogin(user, token));
        })
        .catch((err) => console.log(err));
    }
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

