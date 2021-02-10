exports.addNewDM = async(req, res, next) => {
    res.status(200).json({
        message: "Added in User's recent DM Successfully"
    });
}

exports.getUserDetails = async(req, res, next) => {
    res.status(200).json({
        userFriends: [{
            _id: "123",
            name: "Random Name 1"
        }, {
            _id: "234",
            name: "Random Name 2"
        }, {
            _id: "345",
            name: "Random Name 3"
        }],
        userSubscribedChannels: [{
            _id: "123",
            name: "Random Channel 1"
        }, {
            _id: "234",
            name: "Random Channel 2"
        }, {
            _id: "345",
            name: "Random Channel 3"
        }]
    });
}

exports.getUserDmMessages = async(req, res, next) => {
    res.status(200).json({
        message: "List of messages: 21 to 40",
        "message-list": [{
            _id: "123",
            messagePayload: "Message m1"
        }, {
            _id: "234",
            messagePayload: "Message m2"
        }, {
            _id: "345",
            messagePayload: "Message m3"
        }]
    });
}

exports.sendMessageInDM = async(req, res, next) => {
    res.status(200).json({
        message: "Message Sent Successfully"
    });
}

exports.editMessageInDM = async(req, res, next) => {
    res.status(200).json({
        message: "Message Edited Successfully"
    });
}

exports.deleteMessageInDM = async(req, res, next) => {
    res.status(200).json({
        message: "Message Deleted Successfully"
    });
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
