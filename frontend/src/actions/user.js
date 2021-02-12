
import axios from '../axios';
import * as actionTypes from './actionTypes';

export const fetchFriendsAndChannels = userId => dispatch => {
    axios.get(`/users/${userId}?fields=channels,DMs`)
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

export const channelOpened = channel => dispatch => {
    dispatch(setOpenChannel(channel));
    dispatch(fetchMessagesInChannel(channel._id));
}

export const setOpenChannel = channel => {
    return {
        type: actionTypes.SET_OPEN_CHANNEL,
        payload: {
            channel: channel
        }
    }
}

export const fetchMessagesInChannel = channelId => dispatch => {
    axios.get(`/channels/${channelId}/message?limit=20&offset=0`)
    .then(result => {
        const messages = result.data.messages;
        dispatch(setMessagesInChannel(messages))
    })
    .catch(err => console.log(err));
}

export const setMessagesInChannel = channelMessages => {
    return {
        type: actionTypes.SET_MESSAGES_IN_CHANNEL,
        payload: {
            channelMessages: channelMessages
        }
    }
}

export const dmOpened = dm => dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setOpenDm(dm));
    dispatch(fetchMessagesInDm(user.id, dm._id));
}

export const setOpenDm = dm => {
    return {
        type: actionTypes.SET_OPEN_DM,
        payload: {
            dm: dm
        }
    }
}

export const fetchMessagesInDm = (userId, dmId) => dispatch => {
    axios.get(`/users/${userId}/dm/${dmId}/message?limit=20&offset=0`)
    .then(result => {
        const messages = result.data['message-list'];
        dispatch(setMessagesInDm(messages))
    })
    .catch(err => console.log(err));
}

export const setMessagesInDm = directMessages => {
    return {
        type: actionTypes.SET_MESSAGES_IN_DM,
        payload: {
            directMessages: directMessages
        }
    }
}

export const clearUserData = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA
    }
}

