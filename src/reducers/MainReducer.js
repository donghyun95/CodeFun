import Action from '../actions/actionType';

const InitialState = {
    Htmlvalue : '<div>아랏따리!</div>',
    Cssvalue : 'div{width:100px;}',
    Jsvalue: 'console.log("1")',
    Modal : {isModalOpen: false, childComponent: null},
    LibraryList : ["https://code.jquery.com/jquery-3.1.0.js"]
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
        default: return state;
    }
}

export default MainReducer;