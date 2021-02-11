
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    friends: [],
    subscribedChannels: [],
    channelMessages: [],
    directMessages: [],
    openDm: {},
    openChannel: {}
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

        case actionTypes.SET_OPEN_CHANNEL:
            return {
                ...state,
                openChannel: {...action.payload.channel }
            }

        case actionTypes.SET_OPEN_DM:
            return {
                ...state,
                openDm: {...action.payload.dm }
            }
        
        default:
            return state;
    }
}

export default userReducer;