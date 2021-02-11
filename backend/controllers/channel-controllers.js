const { createChannel, findChannelById, findUserById, findMessagesInChannel, createNewMessage, findMessageByID, getSomeChannels } = require('../utils/db-utils');

exports.createNewChannel = async(req, res, next) => {
    try {
        let { channelName, channelDesc, subscribedUserIDs } = req.body;
        if(!subscribedUserIDs || subscribedUserIDs.length===0) subscribedUserIDs = [req.userId];
        else subscribedUserIDs.push(req.userId);
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
        user.userChannelIDs.push(cid);
        channel.channelSubscribers.push(req.userId);
        await user.save();
        await channel.save();
        res.status(200).json({
            message: "Subscribed to channel Successfully"
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
        res.status(200).json({
            message: `List of messages: ${offset} to ${offset+limit-1}`,
            messages: messages
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
        res.status(200).json({
            message: "Message Sent Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->sendMessageInDM: ", err);
        return next(new HttpError(`Could not send the message, try again`, 400));
    }
}

exports.editMessageInChannel = async(req, res, next) => {
    try {
        const { messageID, messagePayload } = req.body;
        const receiverID = req.query.cid;
        const message = await findMessageByID(messageID);
        message.isEdited = true;
        message.messagePayload = messagePayload;
        await message.save();
        //send socket emit to receiverID
        res.status(200).json({
            message: "Message Edited Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at channel-controllers.js->editMessageInChannel: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.deleteMessageInChannel = async(req, res, next) => {
    try {
        const { messageID } = req.body;
        const message = await findMessageByID(messageID);
        message.isDeleted = true;
        await message.save();
        //send socket emit to receiverID
        res.status(200).json({
            message: "Message deleted Successfully"
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