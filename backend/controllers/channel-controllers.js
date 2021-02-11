const { createChannel } = require('../utils/db-utils');

exports.createNewChannel = async(req, res, next) => {
    let { channelName, channelDesc, subscribedUserIDs } = req.body;
    if(!subscribedUserIDs || subscribedUserIDs.length===0) subscribedUserIDs = [req.userId];
    else subscribedUserIDs.push(req.userId);
    const channel = await createChannel(channelName, channelDesc, req.userId, subscribedUserIDs);
    res.status(200).json({
        message: "Added Channel Successfully",
        channel: channel
    });
}

exports.joinChannelByID = async(req, res, next) => {
    res.status(200).json({
        message: "Subscribed to channel Successfully"
    }); 
}

exports.getChannelMessages = async(req, res, next) => {
    res.status(200).json({
        message: "List of messages: 01 to 20",
        messages: [{
            _id: "2r23",
            message: "Hi"
        }, {
            _id: "d35y",
            message: "hello"
        }]
    });
}

exports.sendMessageInChannel = async(req, res, next) => {
    res.status(200).json({
        message: "Message Sent Successfully"
    });
}

exports.editMessageInChannel = async(req, res, next) => {
    res.status(200).json({
        message: "Message Edited Successfully"
    });
}

exports.deleteMessageInChannel = async(req, res, next) => {
    res.status(200).json({
        message: "Message deleted Successfully"
    });
}

exports.getChannels = async(req, res, next) => {
    res.status(200).json({
        message: "List of channels: 01 to 20",
        channels: [{
            _id: "2r23",
            channelName: "random-channel"
        }, {
            _id: "d35y",
            channelName: "interest-puppys"
        }]
    });
}

// exports.getAllChannels = async(req, res, next) => {
    // try{
    //     const channels = await Channel.find().limit(5);
    //     res.status(200).json({
    //         message: "Fetched channels successfully",
    //         channels: channels
    //     });
    // }
    // catch(err){
    //     console.log(err);
    //     const error = new Error(
    //         'Fetching all channels failed',
    //         500
    //     );
    //     return next(error);
    // }
// }