
import { combineReducers } from 'redux';

import authReducer from './auth';
import userReducer from './user';
import generalReducer from './general';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    general: generalReducer
});

export default rootReducer;