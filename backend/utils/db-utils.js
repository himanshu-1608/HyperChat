const User = require('../models/user');
const Message = require('../models/message');
const Channel = require('../models/channel');
const HttpError = require('../models/http-error');

exports.createNewUser = async (userName, userEmail, userPassword) => {
    try{
        const user = new User({
            userName,
            userEmail,
            userPassword,
            userProfilePicURL: 'https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=45&auto=format&w=496&fit=clip',
            userFriendIDs: [],
            userChannelIDs: [],
            lastSeen: "online"
        });
        await user.save();
        return user;
    } catch(err){
        console.log("Error in creating new user at db-utils.js->createNewUser: ", err);
        throw new HttpError('Could not create user, please try again!', 400);
    }
};

exports.findUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new HttpError('Could not find user for the provided id.',404);
    }
    return user;
};

exports.findUserByEmail = async (userEmail) => {
  const user = await User.findOne({ userEmail: userEmail });
  return user;
};

exports.findUserDetails = async (userId, fields) => {
    let getChannels = false, getFriends = false;
    fields.split(",").map( field => {
        switch(field) {
            case 'channels': getChannels = true;
            break;
            case 'DMs': getFriends = true;
            break;
        }
    });
    let userData;
    if(getChannels && getFriends) {
        userData = await User.findById(userId).populate('userChannelIDs').populate('userFriendIDs').exec();
        return { id: userData.id, userSubscribedChannels: userData.userChannelIDs, userFriends: userData.userFriendIDs };
    } else if(getChannels) {
        userData = await User.findById(userId).populate('userChannelIDs');
        return { id: userData.id, userSubscribedChannels: userData.userChannelIDs, userFriends: [] };
    } else if(getFriends) {
        userData = await User.findById(userId).populate('userFriendIDs');
        return { id: userData.id, userSubscribedChannels: [], userFriends: userData.userFriendIDs };
    }
    //no condition found
    if(!userData) {
        throw new HttpError('Could not find user for the provided id.', 404);
    }
}

exports.createNewMessage = async (messageType, isChannelMessage, senderID, recieverID, sentTime, messagePayload) => {
    try{
        const message = new Message({
            messageType,
            isChannelMessage,
            senderID,
            recieverID,
            sentTime,
            isEdited: false,
            isDeleted: false,
            messagePayload,
            deliveredTime: [],
            seenTime: []
        });
        await message.save();
        return message;
    } catch(err){
        console.log("Error in creating new message at db-utils.js->createNewMessage: ", err);
        throw new HttpError('Could not create message, please try again!', 400);
    }
}

exports.findMessages = async (person1ID, person2ID, limit, offset) => {
    try{
        limit = parseInt(limit);
        offset = parseInt(offset);
        const users = [person1ID, person2ID];
        const messages = await Message.find({senderID: {$in: users}, receiverID: {$in: users}}).hint({ $natural : -1 }).skip(offset).limit(limit);
        return messages;
    } catch(err){
        console.log("Error in creating new message at db-utils.js->findMessages: ", err);
        throw new HttpError('Could not create message, please try again!', 400);
    }
}

exports.findMessageByID = async (messageID) => {
    const message = await Message.findById(messageID);
    if (!message) {
        throw new HttpError('Could not find message for the provided id.',404);
    }
    return message;
}

exports.createChannel = async (channelName, channelDesc, channelCreatedBy, subscribedUserIDs) => {
    try{
        //There should be a better approach for this:
        const channel = new Channel({
            channelName,
            channelDesc,
            channelCreatedBy,
            channelSubscribers: subscribedUserIDs
        });
        //The below part save the channel and then put the channel id in all subscriber list and is very time taking. Optimize it in 2nd sprint.
        await channel.save();
        const updatedChannel = await Channel.findById(channel.id).populate('channelSubscribers');
        updatedChannel.channelSubscribers.map(async (channelSubscriber) => {
            channelSubscriber.userChannelIDs.push(channel.id);
            await channelSubscriber.save();
        });
        await updatedChannel.save();
        return updatedChannel;
    } catch(err){
        console.log("Error in creating new user at db-utils.js->createNewUser: ", err);
        throw new HttpError('Could not create user, please try again!', 400);
    }
};