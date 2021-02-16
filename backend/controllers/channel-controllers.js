const { createChannel, findChannelById, findUserById, findMessagesInChannel, createNewMessage, findMessageByID, getSomeChannels, setSeenTime } = require('../utils/db-utils');
const HttpError = require('../models/http-error');
const { getIo } = require('../socket');

exports.createNewChannel = async(req, res, next) => {
    try {
        let { channelName, channelDesc } = req.body;
        const subscribedUserIDs = [ req.userId ];
        const channel = await createChannel(channelName, channelDesc, req.userId, subscribedUserIDs);
        res.status(200).json({
            message: "Added Channel Successfully",
            channel: channel
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->createNewChannel: ", err);
        return next(new HttpError(`Could not create channel, try again`, 400));
    }
}

exports.joinChannelByID = async(req, res, next) => {
    try {
        const { cid } = req.params;
        const channel = await findChannelById(cid);
        const user = await findUserById(req.userId);
        if(!channel) throw new HttpError(`Could not find channel by provided id, try again`, 404);
        if(!user) throw new HttpError(`Could not find user, try again`, 404);
        if(user.userChannelIDs.find(userChannelID => userChannelID == cid)) {
            throw new HttpError(`Already part of current group`, 409);
        }
        user.userChannelIDs.push(cid);
        channel.channelSubscribers.push(req.userId);
        await user.save();
        await channel.save();
        res.status(200).json({
            message: "Subscribed to channel Successfully",
            channel: channel
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->joinChannelByID: ", err);
        return next(new HttpError(`Could not join channel, try again`, 400));
    } 
}

exports.getChannelMessages = async(req, res, next) => {
    try {
        const channelId = req.params.cid;
        let { limit, offset } = req.query;
        if(!limit || limit>=50) limit = 20;
        if(!offset) offset = 0;
        offset = parseInt(offset);
        limit = parseInt(limit);
        const messages = await findMessagesInChannel(channelId, limit, offset);
        const updatedMessages = await setSeenTime(messages, req.userId);
        res.status(200).json({
            message: `List of messages: ${offset} to ${offset+limit-1}`,
            messages: updatedMessages
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->getChannelMessage: ", err);
        return next(new HttpError(`Could not find messages, try again`, 400));
    }
}

exports.sendMessageInChannel = async(req, res, next) => {
    try {
        const { messageType, messagePayload, sentTime } = req.body;
        const receiverId = req.params.cid;
        const message = await createNewMessage(messageType, true, req.userId, receiverId, sentTime, messagePayload);
        const io = getIo();
        io.to(receiverId).emit('CHANNEL_MESSAGE', message);
        res.status(200).json({
            response: "Message Sent Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->sendMessageInChannel: ", err);
        return next(new HttpError(`Could not send the message, try again`, 400));
    }
}

exports.editMessageInChannel = async(req, res, next) => {
    try {
        const { messageID, messagePayload } = req.body;
        const receiverId = req.params.cid;
        const message = await findMessageByID(messageID);
        message.isEdited = true;
        message.messagePayload = messagePayload;
        await message.save();
        const io = getIo();
        io.to(receiverId).emit('EDIT_MESSAGE_CHANNEL', message);
        res.status(200).json({
            response: "Message Edited Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->editMessageInChannel: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.deleteMessageInChannel = async(req, res, next) => {
    try {
        const messageID = req.params.mid;
        const receiverId = req.params.cid; 
        const message = await findMessageByID(messageID);
        message.isDeleted = true;
        await message.save();
        const io = getIo();
        io.to(receiverId).emit('DELETE_MESSAGE_CHANNEL', message);
        res.status(200).json({
            response: "Message deleted Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->deleteMessageInChannel: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.getChannels = async(req, res, next) => {
    try {
        let { limit, offset } = req.query;
        if(!limit || limit>=50) limit = 20;
        if(!offset) offset = 0;
        offset = parseInt(offset);
        limit = parseInt(limit);
        const channels = await getSomeChannels(limit, offset);
        
        res.status(200).json({
            message: `List of channels: ${offset} to ${offset+limit-1}`,
            channels: channels
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->getChannels: ", err);
        return next(new HttpError(`Could not find channels, try again`, 400));
    }
}