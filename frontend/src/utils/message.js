
import axios from '../axios';

export const sendMessageInDm = (userId, message) => {
    axios.post(`/users/${userId}/dm/message`, message)
    .then(result => {
        // console.log(result);
    })
    .catch(err => console.log(err));
}

export const sendMessageInChannel = (channelId, message) => {
    axios.post(`/channels/${channelId}/message`, message)
    .then(result => {
        // console.log(result);
    })
    .catch(err => console.log(err));
}

export const editMessageInDm = (userId, message, hideModal) => {
    axios.put(`/users/${userId}/dm/message`, message)
    .then(result => {
        hideModal();
    })
    .catch(err => console.log(err));
}

export const editMessageInChannel = (channelId, message, hideModal) => {
    axios.put(`/channels/${channelId}/message`, message)
    .then(result => {
        hideModal();
    })
    .catch(err => console.log(err));
}