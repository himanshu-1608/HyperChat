
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    channels: [],
    users: []
}

const generalReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SET_CHANNELS:
            return {
                ...state,
                channels: action.payload.channels
            }
        
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.payload.users
            }

        default:
            return state;
    }
}

export default generalReducer;