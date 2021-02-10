
const Message = require('../models/message');
const socket = require('../socket');

exports.getMessages = async(req, res, next) => {
    try{
        console.log(req.userId, req.params.id);
        const arr = [ req.userId, req.params.id];
        const messages = await Message.find({
            senderID: {$in: [...arr]},
            recieverID: {$in: [...arr]}
        });
        // const messages = await Message.find();
        console.log('Fetched messages: ', messages);

        res.status(200).json({
            message: "Fetched messages successfully",
            messages: messages
        });
    }
    catch(err){
        console.log(err);
        const error = new Error(
            'Fetching messages failed',
            500
        );
        return next(error);
    }
}

exports.sendMessage = async(req, res, next) => {
    try{
        const { messageType, 
            messagePayload, 
            isChannelMessage, 
            recieverID, 
            sentTime} = req.body;

        const message = new Message({
            messageType: messageType,
            isChannelMessage: isChannelMessage,
            senderID: req.userId,
            recieverID: recieverID,
            sentTime: sentTime,
            isEdited: false,
            messagePayload: messagePayload
        });

        const createdMessage = await message.save();
        const io = socket.getIO();
        // console.log('io rooms are is: ', io.rooms);
        if(io){
            console.log('here');
            io.to(recieverID).to(req.userId).emit('DIRECT_MESSAGE', {
                message: message
            });
        }

        // console.log('createdMessage: ', createdMessage);
        res.status(200).json({
            message: "Message sent successfully"
        });

    }
    catch(err){
        console.log(err);
        const error = new Error(
            'Send message failed',
            500
        );
        return next(error);
    }
}

exports.editMessage = async(req, res, next) => {
    
}


exports.deleteMessage = async(req, res, next) => {
    
}