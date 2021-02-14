
import axios from '../axios';

export const sendMessageInDm = (userId, message, addMessageInDmAction) => {
    axios.post(`/users/${userId}/dm/message`, message)
    .then(result => {
        const { message } = result.data;
        addMessageInDmAction(message);
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

export const editMessageInDm = (userId, message, hideModal, editMessageInDmAction) => {
    axios.put(`/users/${userId}/dm/message`, message)
    .then(result => {
        const { message } = result.data;
        editMessageInDmAction(message);
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

export const deleteMessageInDm = (userId, messageId, hideModal, deleteMessageInDmAction) => {
    axios.delete(`/users/${userId}/dm/message/${messageId}`)
    .then(result => {
        const { message } = result.data;
        deleteMessageInDmAction(message);
        hideModal();
    })
    .catch(err => console.log(err));
}

export const deleteMessageInChannel = (channelId, messageId, hideModal) => {
    axios.delete(`/channels/${channelId}/message/${messageId}`)
    .then(result => {
        hideModal();
    })
    .catch(err => console.log(err));
}