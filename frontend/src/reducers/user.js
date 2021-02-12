
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    friends: [],
    subscribedChannels: [],
    channelMessages: [],
    directMessages: [],
    openDm: null,
    openChannel: null
}

const userReducer = (state = initialState, action) => {

    let updatedChannelMessages = [];
    let updatedDirectMessages = [];
    let newMessage = {};

    switch(action.type){

        case actionTypes.SET_FRIENDS_AND_CHANNELS:
            return {
                ...state,
                friends: [...action.payload.friends],
                subscribedChannels: [...action.payload.subscribedChannels]
            }

        case actionTypes.SET_MESSAGES_IN_CHANNEL:
            return {
                ...state,
                channelMessages: [...action.payload.channelMessages]
            }

        case actionTypes.SET_MESSAGES_IN_DM:
            return {
                ...state,
                directMessages: [...action.payload.directMessages]
            }

        case actionTypes.SET_OPEN_CHANNEL:
            return {
                ...state,
                openChannel: {...action.payload.channel },
                openDm: null
            }

        case actionTypes.SET_OPEN_DM:
            return {
                ...state,
                openDm: {...action.payload.dm },
                openChannel: null
            }

        case actionTypes.JOIN_CHANNEL:
            return {
                ...state,
                subscribedChannels: [...state.subscribedChannels, action.payload.channel]
            }

        case actionTypes.ADD_NEW_DM:
            return {
                ...state,
                friends: [...state.friends, action.payload.dm]
            }

        case actionTypes.ADD_MESSAGE_IN_CHANNEL:
            return {
                ...state,
                channelMessages: [...state.channelMessages, action.payload.channelMessage]
            }

        case actionTypes.ADD_MESSAGE_IN_DM:
            return {
                ...state,
                directMessages: [...state.directMessages, action.payload.directMessage]
            }

        case actionTypes.EDIT_MESSAGE_IN_CHANNEL:
            updatedChannelMessages = state.channelMessages.map(message => {
                if(message._id == action.payload.editedMessage._id)
                    return {
                        ...message,
                        messagePayload: action.payload.editedMessage.messagePayload
                    }
                return message;
            })
            return {
                ...state,
                channelMessages: updatedChannelMessages
            }

        case actionTypes.EDIT_MESSAGE_IN_DM:
            updatedDirectMessages = state.directMessages.map(message => {
                if(message._id == action.payload.editedMessage._id){
                    return {
                        ...message,
                        messagePayload: action.payload.editedMessage.messagePayload
                    }
                }
                return message;
            })
            return {
                ...state,
                directMessages: updatedDirectMessages
            }

        case actionTypes.DELETE_MESSAGE_IN_CHANNEL:
            updatedChannelMessages = state.channelMessages.map(message => {
                if(message._id == action.payload.deletedMessage._id){
                    return {
                        ...message,
                        isDeleted: action.payload.deletedMessage.isDeleted
                    }
                }    
                return message;
            })
            return {
                ...state,
                channelMessages: updatedChannelMessages
            }

        case actionTypes.DELETE_MESSAGE_IN_DM:
            updatedDirectMessages = state.directMessages.map(message => {
                if(message._id == action.payload.deletedMessage._id){
                    return {
                        ...message,
                        isDeleted: action.payload.deletedMessage.isDeleted
                    }
                }        
                return message;
            })
            return {
                ...state,
                directMessages: updatedDirectMessages
            }

        case actionTypes.CREATE_CHANNEL:
            return {
                ...state,
                subscribedChannels: [...state.subscribedChannels, action.payload.channel]
            }

        case actionTypes.CLEAR_USER_DATA:
            return initialState;
        
        default:
            return state;
    }
}

export default userReducer;