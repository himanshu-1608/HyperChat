import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    user: {},
    token: null
}

const reducer = (state = initialState, action) => {
    switch( action.type ){

        case actionTypes.SET_LOGIN:
            return {
                ...state,
                isAuth: true,
                user: {...action.payload.user},
                token: action.payload.token
            }

        case actionTypes.SET_LOGOUT:
            return{
                ...state,
                isAuth: false,
                user: {},
                token: null
            }

        default:
            return state;
    }
}

export default reducer;