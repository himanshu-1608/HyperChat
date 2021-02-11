
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    friends: [],
    subscribedChannels: [],
    channelMessages: [],
    directMessages: [],
    openDmId: null,
    openChannelId: null
}

const userReducer = (state = initialState, action) => {
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

        case actionTypes.SET_OPEN_CHANNEL_ID:
            return {
                ...state,
                openChannelId: action.payload.channelId
            }

        case actionTypes.SET_OPEN_DM_ID:
            return {
                ...state,
                openDmId: action.payload.friendId
            }
        
        default:
            return state;
    }
}

export default userReducer;