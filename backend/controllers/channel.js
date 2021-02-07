
const Channel = require('../models/channel');

exports.createNewChannel = async(req, res, next) => {

}

exports.joinChannelByID = async(req, res, next) => {
    
}

exports.getAllChannels = async(req, res, next) => {
    try{
        const channels = await Channel.find().limit(5);
        res.status(200).json({
            message: "Fetched channels successfully",
            channels: channels
        });
    }
    catch(err){
        console.log(err);
        const error = new Error(
            'Fetching all channels failed',
            500
        );
        return next(error);
    }
}