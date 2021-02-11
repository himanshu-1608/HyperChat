const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    channelName: {
        type: String,
        required: true
    },
    channelDesc: {
        type: String,
        required: true
    },
    channelCreatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channelSubscribers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Channel', channelSchema);