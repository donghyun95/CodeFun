import Action from '../actions/actionType';

const initialState = {
    postList : [],
    pending: false,
    isLast : false
};

// return Object.assign({},state)

export default function(state=initialState, action) {
    switch(action.type){
        case Action.BOARDREQUEST_PENDING :
            return Object.assign({},state,{
                pending: true
            });
        case Action.BOARDREQUEST_SUCCESS :
            return Object.assign({},state, {
                pending: false,
                postList: action.data,
                isLast: false
            });
        case Action.BOARDREQUEST_NEWSUCCESS :
            return Object.assign({},state,{
                pending: false,
                postList: [...action.data,...state.postList]
            });
        case Action.BOARDREQUEST_OLDSUCCESS :
            return Object.assign({},state,{
                pending: false,
                postList: [...state.postList, ...action.data]
            });
        case Action.BOARDREQUEST_FAIL : 
            return Object.assign({},state,{
                pending: false,
            });
        case Action.BOARDREQUEST_LAST :
            return Object.assign({},state,{
                isLast: true
            });
        default : return state;
    }
};