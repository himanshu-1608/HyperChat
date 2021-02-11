const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userProfilePicURL: {
        type: String,
    },
    userFriendIDs: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    userChannelIDs: [{
        type: Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    lastSeen: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);