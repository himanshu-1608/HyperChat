
import openSocket from 'socket.io-client';
// import { unsetTypingInDm, unsetTypingInChannel } from './actions/index';

let socket;
export const init = (  
    addMessageInChannel, 
    addMessageInDm, 
    editMessageInChannel, 
    editMessageInDm, 
    deleteMessageInChannel,
    deleteMessageInDm,
    setTypingInDm,
    setTypingInChannel,
    unsetTypingInDm,
    unsetTypingInChannel ) => {

    socket = openSocket('http://localhost:8080');
    const user = JSON.parse(localStorage.getItem('user'));
    if( !user )
        return;

    socket.on('connect', () => {
        console.log('Socketid in connect', socket.id);

        setEvents(addMessageInChannel, 
            addMessageInDm, 
            editMessageInChannel, 
            editMessageInDm, 
            deleteMessageInChannel,
            deleteMessageInDm,
            setTypingInDm,
            setTypingInChannel,
            unsetTypingInDm,
            unsetTypingInChannel,
            user
        );
        
        socket.on('reconnect', () => {
            setEvents(addMessageInChannel, 
                addMessageInDm, 
                editMessageInChannel, 
                editMessageInDm, 
                deleteMessageInChannel,
                deleteMessageInDm,
                setTypingInDm,
                setTypingInChannel,
                unsetTypingInDm,
                unsetTypingInChannel,
                user
            );
            console.log('Reconnected');
        })

        // socket.on('disconnect', console.log('Socket disconnected'));
    });
}

const setEvents = (
    addMessageInChannel, 
    addMessageInDm, 
    editMessageInChannel, 
    editMessageInDm, 
    deleteMessageInChannel,
    deleteMessageInDm,
    setTypingInDm,
    setTypingInChannel,
    unsetTypingInDm,
    unsetTypingInChannel,
    user
) => {
   
    socket.emit('USER_JOINED', user._id);
    
    socket.on('DIRECT_MESSAGE', message => {
        // console.log("DIRECT_MESSAGE came at room: ", user._id, message);
        addMessageInDm(message);
    });
        
    socket.on('EDIT_MESSAGE_DM', message => {
        // console.log("EDIT_MESSAGE_DM came at room: ", user._id, message);
        editMessageInDm(message);
    });

    socket.on('DELETE_MESSAGE_DM', message => {
        // console.log("DELETE_MESSAGE_DM came at room: ", user._id, message);
        deleteMessageInDm(message);
    });
    
    socket.on('CHANNEL_MESSAGE', message => {
        // console.log("CHANNEL_MESSAGE came at room: ", message);
        addMessageInChannel(message);
    });

    socket.on('EDIT_MESSAGE_CHANNEL', message => {
        // console.log("EDIT_MESSAGE_CHANNEL came at room: ", message);
        editMessageInChannel(message);
    });
    
    socket.on('DELETE_MESSAGE_CHANNEL', message => {
        // console.log("DELETE_MESSAGE_CHANNEL came at room: ", message);
        deleteMessageInChannel(message);
    });

    socket.on('TYPING', data => {
        // console.log('Typing back', data);
        if(!data.isChannel)
            setTypingInDm(data.senderID);
        else if(data.isChannel && data.senderID != user._id )
            setTypingInChannel(data.receiverID, data.senderName);
        
    });

    socket.on('STOP_TYPING', data => {
        // console.log('Stop Typing back', data);
        if(!data.isChannel)
            unsetTypingInDm(data.senderID);
        else if(data.isChannel && data.senderID != user._id)
            unsetTypingInChannel(data.receiverID);
    })
}

export const disconnectSocket = () => {
    if(socket){
        console.log('Socketid before disconnect', socket.id);
        socket.disconnect();
        console.log('Socketid after disconnect', socket.id);
    }
}

export const getSocket = () => socket;