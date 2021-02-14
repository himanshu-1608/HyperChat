
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

    let updatedSubscribedChannels = [];
    let updatedFriends = [];
    let updatedChannelMessages = [];
    let updatedDirectMessages = [];

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
                if(message._id === action.payload.editedMessage._id)
                    return {
                        ...message,
                        isEdited: action.payload.editedMessage.isEdited,
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
                if(message._id === action.payload.editedMessage._id){
                    return {
                        ...message,
                        isEdited: action.payload.editedMessage.isEdited,
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
                if(message._id === action.payload.deletedMessage._id){
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
                if(message._id === action.payload.deletedMessage._id){
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

        case actionTypes.SET_TYPING_IN_CHANNEL:
            updatedSubscribedChannels = state.subscribedChannels.map(channel => {
                if(channel._id == action.payload.channelId){
                    return {
                        ...channel,
                        isTyping: true,
                        typingInfo: {
                            userName: action.payload.userName,
                        }
                    }
                }
                return channel;
            })
            return {
                ...state,
                subscribedChannels: updatedSubscribedChannels
            }

        case actionTypes.SET_TYPING_IN_DM:
            updatedFriends = state.friends.map(friend => {
                if(friend._id == action.payload.dmId){
                    return {
                        ...friend,
                        isTyping: true
                    }
                }
                return friend;
            });
            return {
                ...state,
                friends: updatedFriends
            }

        case actionTypes.UNSET_TYPING_IN_CHANNEL:
            updatedSubscribedChannels = state.subscribedChannels.map(channel => {
                if(channel._id == action.payload.channelId){
                    return {
                        ...channel,
                        isTyping: false,
                        typingInfo: null
                    }
                }
                return channel;
            })
            return {
                ...state,
                subscribedChannels: updatedSubscribedChannels
            }

        case actionTypes.UNSET_TYPING_IN_DM:
            updatedFriends = state.friends.map(friend => {
                if(friend._id == action.payload.dmId){
                    return {
                        ...friend,
                        isTyping: false
                    }
                }
                return friend;
            });
            return {
                ...state,
                friends: updatedFriends
            }

        case actionTypes.SET_TYPING_IN_OPEN_CHANNEL:
            if(state.openChannel && action.payload.channelId == state.openChannel._id)
                return {
                    ...state,
                    openChannel: {
                        ...state.openChannel,
                        isTyping: true,
                        typingInfo: {
                            userName: action.payload.userName,
                        }
                    }
                }
            return state;

        case actionTypes.SET_TYPING_IN_OPEN_DM:
            if(state.openDm && action.payload.dmId == state.openDm._id)  
                return {
                    ...state,
                    openDm: {
                        ...state.openDm,
                        isTyping: true
                    }
                }
            return state;

        case actionTypes.UNSET_TYPING_IN_OPEN_CHANNEL:
            if(state.openChannel && action.payload.channelId == state.openChannel._id)
                return {
                    ...state,
                    openChannel: {
                        ...state.openChannel,
                        isTyping: false,
                        typingInfo: null
                    }
                }
            return state;

        case actionTypes.UNSET_TYPING_IN_OPEN_DM:
            if( state.openDm && action.payload.dmId == state.openDm._id)
                return {
                    ...state,
                    openDm: {
                        ...state.openDm,
                        isTyping: false
                    }
                }
            return state;
        
        case actionTypes.CLEAR_USER_DATA:
            return initialState;
        
        default:
            return state;
    }
}

export default userReducer;