const { findUserById, findUserDetails, createNewMessage, findMessages, findMessageByID } = require('../utils/db-utils');
const HttpError = require('../models/http-error');

exports.addNewDM = async(req, res, next) => {
    try {
        const { DmID } = req.body;
        const user = await findUserById(req.userId);
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
        const messages = await findMessages(req.userId, req.params.dmid, limit, offset);
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
        const { messageType, messagePayload, recieverID, sentTime } = req.body;
        await createNewMessage(messageType, false, req.userId, recieverID, sentTime, messagePayload);
        res.status(200).json({
            message: "Message Sent Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->sendMessageInDM: ", err);
        return next(new HttpError(`Could not send the message, try again`, 400));
    }
}

exports.editMessageInDM = async(req, res, next) => {
    try {
        const { messageID, messagePayload, recieverID } = req.body;
        const message = await findMessageByID(messageID);
        message.isEdited = true;
        message.messagePayload = messagePayload;
        await message.save();
        //send socket emit to recieverID
        res.status(200).json({
            message: "Message Edited Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->editMessageInDM: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.deleteMessageInDM = async(req, res, next) => {
    try {
        const { messageID } = req.body;
        const message = await findMessageByID(messageID);
        message.isDeleted = true;
        await message.save();
        //send socket emit to recieverID
        res.status(200).json({
            message: "Message Deleted Successfully"
        });
    } catch(err) {
        if(err.code) return next(err);
        console.log("Unexpected Error at user-controllers.js->editMessageInDM: ", err);
        return next(new HttpError(`Could not edit the message, try again`, 400));
    }
}

exports.getAllUsers = async(req, res, next) => {
    // try{
    //     const users = await User.find({_id: {$nin: [req.userId]}}).limit(5);
    //     res.status(200).json({
    //         message: "Fetched users successfully",
    //         users: users
    //     });
    // }
    // catch(err){
    //     console.log(err);
    //     const error = new Error(
    //         'Fetching all users failed.',
    //         500
    //     );
    //     return next(error);
    // }
    res.status(200).json({
        message: "List of users: 21 to 40",
        users: [{
            _id: "123",
            name: "Random Name 1"
        }, {
            _id: "234",
            name: "Random Name 2"
        }, {
            _id: "345",
            name: "Random Name 3"
        }]
    });
}
