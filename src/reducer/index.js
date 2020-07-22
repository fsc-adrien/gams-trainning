import { combineReducers } from 'redux';
import userReducer from './userReducer';
import assetReducer from './assetReducer';

const rootReducer = combineReducers({
    userReducer,
    assetReducer,
})

export default rootReducer;