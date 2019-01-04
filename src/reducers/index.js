import {combineReducers} from 'redux';
import MainReducer from './MainReducer';
import UserInfoReudcer from './UserInfoReducer';


const rootReducer = combineReducers({
    UserInfo : UserInfoReudcer,
    Project : MainReducer
});


export default rootReducer;