const { findUserById, findUserDetails, createNewMessage, findMessagesInDm, findMessageByID, getUsers } = require('../utils/db-utils');
const HttpError = require('../models/http-error');
const { getIo } = require('../socket');

exports.addNewDM = async(req, res, next) => {
    try {
        const { DmID } = req.body;
        const user = await findUserById(req.userId);
        if(user.userFriendIDs.find(userFriendID => userFriendID == DmID)) {
            throw new HttpError('User already inside DM list!', 409);
        }
        if(user.userFriendIDs.length<10) {
            user.userFriendIDs.push({$each: [DmID], $position: 0});
        } else {
            user.userFriendIDs.pull(user.userFriendIDs[9]);
            user.userFriendIDs.push({$each: [DmID], $position: 0});
        }
        await user.save();
        res.status(200).json({
            message: "Added in User's recent DM Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->addNewDM: ", err);
        return next(new HttpError(`Could not add to user's recents list, try again`, 400));
    }
}

exports.getUserDetails = async(req, res, next) => {
    try {
        const fields = req.query.fields;
        if(!fields) throw new HttpError('Please add fields in the query!', 400);
        const userData = await findUserDetails(req.userId,fields);
        res.status(200).json(userData);
    } catch(err) { 
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->getUserDetails: ", err);
        return next(new HttpError(`Could not get user's details, try again`, 400));
    }
}

exports.getUserDmMessages = async(req, res, next) => {
    try {
        let { limit, offset } = req.query;
        if(!limit || limit>=50) limit = 20;
        if(!offset) offset = 0;
        offset = parseInt(offset);
        limit = parseInt(limit);
        const messages = await findMessagesInDm(req.userId, req.params.dmid, limit, offset);
        res.status(200).json({
            message: `List of messages(most recent first): ${offset} to ${offset+limit-1}`,
            "message-list": messages
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->getUserDmMessages: ", err);
        return next(new HttpError(`Could not get user's details, try again`, 400));
    }
}

exports.sendMessageInDM = async(req, res, next) => {
    try {
        const { messageType, messagePayload, receiverID, sentTime } = req.body;
        const message = await createNewMessage(messageType, false, req.userId, receiverID, sentTime, messagePayload);
        const io = getIo();
        io.to(receiverID).emit('DIRECT_MESSAGE', message);
        res.status(200).json({
            response: "Message Sent Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->sendMessageInDM: ", err);
        return next(new HttpError(`Could not send the message, try again`, 400));
    }
}

exports.editMessageInDM = async(req, res, next) => {
    try {
        const { messageID, messagePayload } = req.body;
        const message = await findMessageByID(messageID);
        message.isEdited = true;
        message.messagePayload = messagePayload;
        await message.save();
        const io = getIo();
        io.to(message.receiverID).emit('EDIT_MESSAGE_DM', message);
        res.status(200).json({
            response: "Message Edited Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->editMessageInDM: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.deleteMessageInDM = async(req, res, next) => {
    try {
        const messageID = req.params.mid;
        const message = await findMessageByID(messageID);
        message.isDeleted = true;
        message.messagePayload = '';
        message.deliveredTime = [];
        message.seenTime = [];
        await message.save();
        const io = getIo();
        io.to(message.receiverID).emit('DELETE_MESSAGE_DM', message);
        res.status(200).json({
            response: "Message Deleted Successfully",
            message: message
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->deleteMessageInDM: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.getAllUsers = async(req, res, next) => {
    try {
        let { limit, offset, fields } = req.query;
        if(!fields) throw new HttpError('Please add fields in the query!', 400);
        if(!limit || limit>=50) limit = 20;
        if(!offset) offset = 0;
        offset = parseInt(offset);
        limit = parseInt(limit);
        const users = await getUsers(limit, offset,fields);
        
        res.status(200).json({
            message: `List of users: ${offset} to ${offset+limit-1}`,
            users: users
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->getAllUsers: ", err);
        return next(new HttpError(`Could not find users, try again`, 400));
    }
}
