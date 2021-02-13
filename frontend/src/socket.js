
import openSocket from 'socket.io-client';

let socket;
export const init = (  
    addMessageInChannel, 
    addMessageInDm, 
    editMessageInChannel, 
    editMessageInDm, 
    deleteMessageInChannel,
    deleteMessageInDm,
    subscribedChannels ) => {

    socket = openSocket('http://localhost:8080');
    const user = JSON.parse(localStorage.getItem('user'));
    if( !user )
        return;

    const channelIDs = subscribedChannels.map(channel => channel._id);

    socket.on('connect', () => {
        socket.emit('USER_JOINED', {
			userID: user._id,
			channelIDs: channelIDs
        });
        
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
            console.log("CHANNEL_MESSAGE came at room: ", message);
            addMessageInChannel(message);
        });
        
        socket.on('EDIT_MESSAGE_CHANNEL', message => {
            console.log("EDIT_MESSAGE_CHANNEL came at room: ", message);
            editMessageInChannel(message);
        });
        
        socket.on('DELETE_MESSAGE_CHANNEL', message => {
            console.log("DELETE_MESSAGE_CHANNEL came at room: ", message);
            deleteMessageInChannel(message);
        });

        socket.on('disconnect', console.log('Socket disconnected'));
    });
}

export const disconnectSocket = () => socket.disconnect();

export const getSocket = () => socket;