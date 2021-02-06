
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    messageType: {
        type: String,
        required: true
    },
    isChannelMessage: {
        type: Boolean,
        required: true
    },
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recieverID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    messagePayload: {
        type: String,
        required: true
    },
    deliveredTime: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        deliveredTime: {
            type: String
        }
    }],
    seenTime: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        seenTime: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Message', messageSchema);

