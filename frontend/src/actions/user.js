
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
    dispatch(setReadChannel(channel._id));
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
    dispatch(setReadDm(dm._id));
}

export const setOpenDm = dm => {
    return {
        type: actionTypes.SET_OPEN_DM,
        payload: {
            dm: dm
        }
    }
}

export const joinChannel = (channelId, history) => dispatch => {
    axios.post(`/channels/${channelId}/join`)
    .then(result => {
        const { channel } = result.data;
        dispatch(addJoinedChannelInReduxStore(channel));
        dispatch(setOpenChannel(channel));
        history.push('/');
    })
    .catch(err => console.log(err));
}

export const addJoinedChannelInReduxStore = channel => {
    return {
        type: actionTypes.JOIN_CHANNEL,
        payload: {
            channel: channel
        }
    }
}

export const addDm = (dm, userId, history) => dispatch => {
    axios.put(`/users/${userId}/dm/add`, { DmID: dm.id })
    .then(result => {
        const { dmUser } = result.data;
        dispatch(setOpenDm(dmUser));
        dispatch(addDmInReduxStore(dmUser));
        history.push('/');
    })
    .catch(err => console.log(err));
}

export const addDmInReduxStore = dm => {
    return {
        type: actionTypes.ADD_NEW_DM,
        payload: {
            dm: dm
        }
    }
}

export const fetchMessagesInDm = (userId, dmId) => dispatch => {
    axios.get(`/users/${userId}/dm/${dmId}/message?limit=20&offset=0`)
    .then(result => {
        const messages = result.data['message-list'];
        // console.log(messages);
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

export const addMessageInChannel = message => dispatch => {
    dispatch(addMessageInChannelUtil(message));
    dispatch(setUnreadChannel(message.receiverID));
}

export const addMessageInChannelUtil = message => {
    return {
        type: actionTypes.ADD_MESSAGE_IN_CHANNEL,
        payload: {
            channelMessage: message
        }
    }
}

export const addMessageInDm = message => dispatch => {
    // console.log(message);
    dispatch(addMessageInDmUtil(message));
    dispatch(setUnreadDm(message.senderID._id));
}

export const addMessageInDmUtil = message => {
    return {
        type: actionTypes.ADD_MESSAGE_IN_DM,
        payload: {
            directMessage: message
        }
    }
}

export const editMessageInChannel = message => {
    return {
        type: actionTypes.EDIT_MESSAGE_IN_CHANNEL,
        payload: {
            editedMessage: message
        }
    }
}

export const editMessageInDm = message => {
    return {
        type: actionTypes.EDIT_MESSAGE_IN_DM,
        payload: {
            editedMessage: message
        }
    }
}

export const deleteMessageInChannel = message => {
    return {
        type: actionTypes.DELETE_MESSAGE_IN_CHANNEL,
        payload: {
            deletedMessage: message
        }
    }
}

export const deleteMessageInDm = message => {
    return {
        type: actionTypes.DELETE_MESSAGE_IN_DM,
        payload: {
            deletedMessage: message
        }
    }
}

export const createChannel = (channel, hideModal) => dispatch => {
    axios.post('/channels', channel)
    .then(result => {
        const { channel } = result.data;
        dispatch(addCreatedChannelToStore(channel));
        hideModal();
    })
    .catch(err => console.log(err));
}

export const addCreatedChannelToStore = channel => {
    return {
        type: actionTypes.CREATE_CHANNEL,
        payload: {
            channel: channel
        }
    }
}

export const setTypingInChannel = (channelId, typedBy) => {
    return {
        type: actionTypes.SET_TYPING_IN_CHANNEL,
        payload: {
            channelId: channelId,
            userName: typedBy
        }
    }
}

export const setTypingInDm = dmId => {
    return {
        type: actionTypes.SET_TYPING_IN_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const unsetTypingInChannel = channelId => {
    return {
        type: actionTypes.UNSET_TYPING_IN_CHANNEL,
        payload: {
            channelId: channelId
        }
    }
}

export const unsetTypingInDm = dmId => {
    return {
        type: actionTypes.UNSET_TYPING_IN_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const setTypingInOpenChannel = (channelId, typedBy) => {
    return {
        type: actionTypes.SET_TYPING_IN_OPEN_CHANNEL,
        payload: {
            channelId: channelId,
            userName: typedBy
        }
    }
}

export const setTypingInOpenDm = dmId => {
    return {
        type: actionTypes.SET_TYPING_IN_OPEN_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const unsetTypingInOpenChannel = channelId => {
    return {
        type: actionTypes.UNSET_TYPING_IN_OPEN_CHANNEL,
        payload: {
            channelId: channelId
        }
    }
}

export const unsetTypingInOpenDm = dmId => {
    return {
        type: actionTypes.UNSET_TYPING_IN_OPEN_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const setUnreadChannel = channelId => {
    return {
        type: actionTypes.SET_UNREAD_CHANNEL,
        payload: {
            channelId: channelId
        }
    }
}

export const setUnreadDm = dmId => {
    return {
        type: actionTypes.SET_UNREAD_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const setReadChannel = channelId => {
    return {
        type: actionTypes.SET_READ_CHANNEL,
        payload: {
            channelId: channelId
        }
    }
}

export const setReadDm = dmId => {
    return {
        type: actionTypes.SET_READ_DM,
        payload: {
            dmId: dmId
        }
    }
}

export const clearUserData = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA
    }
}

