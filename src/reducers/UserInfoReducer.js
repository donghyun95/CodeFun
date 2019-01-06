import Action from '../actions/actionType';

const initialState = {
    USERObjectId: null,
    USER: null,
    ProjectList : [],
    isLoggedin : false,
    pending: false,
    error: false,
};


function UserInfoReducer(state=initialState, action) {
    switch(action.type) {
        case Action.USERREQUEST_PENDING :
            return Object.assign({},state,{
                pending: true,
                error: false
            });
        case Action.USERREQUEST_SUCCESS:
            return Object.assign({},state,{
                pending: false,
                isLoggedin: true,
                USERObjectId: action.payload.userObjectId,
                USER: action.payload.userId,
                ProjectList: action.payload.projectList
            });
        case Action.USERREQUEST_FAIL:
            return Object.assign({},state,{
                pending: false,
                error: true,
                isLoggedin: false
            });
        default: return state;
    }
}

export default UserInfoReducer;