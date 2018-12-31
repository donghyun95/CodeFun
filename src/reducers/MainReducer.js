import Action from '../actions/actionType';

const InitialState = {
    Htmlvalue : '<div>아랏따리!</div>',
    Cssvalue : 'div{width:100px;}',
    Jsvalue: 'console.log("1")',
    Modal : {isModalOpen: false, childComponent: null},
    LibraryList : ["https://code.jquery.com/jquery-3.1.0.js"],
    UpdateNumber: 0
}


function MainReducer(state=InitialState, action) {
    switch(action.type) {
        case Action.CHANGEHTML : 
            return Object.assign({},state,{
                Htmlvalue: action.payload
            });
        case Action.CHANGECSS :
            return Object.assign({},state,{
                Cssvalue: action.payload
            });

        case Action.CHANGEJS :
            return Object.assign({},state,{
                Jsvalue: action.payload
            });
        case Action.CHILDCOMPONENT: 
            return Object.assign({},state,{
                childComponent: action.payload
            });
        case Action.CHANGEMODAL:
            return Object.assign({},state,{
                Modal: {isModalOpen:action.payload.bool, childComponent: action.payload.component}
            });
        case Action.ADDLIBRARY:
            return Object.assign({},state,{
                LibraryList: [...state.LibraryList,action.payload]
            });
        case Action.MODIFYURL:
            return Object.assign({},state,{
                LibraryList: [...state.LibraryList.slice(0,action.payload.index),action.payload.URL,...state.LibraryList.slice(action.payload.index+1)]
            });
        case Action.REMOVEURL:
            return Object.assign({},state,{
                LibraryList: [...state.LibraryList.slice(0,action.payload),...state.LibraryList.slice(action.payload+1)]
            });
        case Action.UPDATENUMBER:
            return Object.assign({},state,{
                UpdateNumber: state.UpdateNumber+1
            });
        default: return state;
    }
}

export default MainReducer;