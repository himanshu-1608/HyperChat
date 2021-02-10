
import axios from '../axios';
import * as actionTypes from './actionTypes';

export const fetchFriendsAndChannels = () => dispatch => {
    axios.get('/user/getUserFriendsAndChannels')
    .then(result => {
        const { userFriends, userSubscribedChannels } = result.data;
        dispatch(setFriendsAndChannels(userFriends, userSubscribedChannels));
    })
    .catch(err => console.log(err));
}

export const setFriendsAndChannels = (friends, subscribedChannels) => {
    return {
        type: actionTypes.SET_FRIENDS_AND_CHANNELS,
        payload: {
            friends: friends,
            subscribedChannels: subscribedChannels
        }
    }
}