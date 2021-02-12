
import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchChannels = () => dispatch => {
    axios.get('/channels?limit=20&offset=0')
    .then(result => {
        const { channels } = result.data;
        dispatch(setChannels(channels));
    })
    .catch(err => console.log(err));
}

export const setChannels = channels => {
    return {
        type: actionTypes.SET_CHANNELS,
        payload: {
            channels: channels
        }
    }
}

export const fetchUsers = () => dispatch => {
    axios.get('/users?limit=20&offset=0&fields=name,id,pic')
    .then(result => {
        const { users } = result.data;
        dispatch(setUsers(users));
    })
    .catch(err => console.log(err));
}

export const setUsers = users => {
    return {
        type: actionTypes.SET_USERS,
        payload: {
            users: users
        }
    }
}

export const clearGeneralData = () => {
    return {
        type: actionTypes.CLEAR_GENERAL_DATA
    }
}