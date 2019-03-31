import {combineReducers} from 'redux';
import MainReducer from './MainReducer';
import UserInfoReudcer from './UserInfoReducer';
import BoardReducer from './BoardReducer';

const rootReducer = combineReducers({
    UserInfo : UserInfoReudcer,
    Project : MainReducer,
    Board : BoardReducer
});


export default rootReducer;