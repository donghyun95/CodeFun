import Action from '../actions/actionType';

const InitialState = {
    Title: "No Title",
    userId: "none",
    Htmlvalue : '<div>아랏따리!</div>',
    Cssvalue : 'div{width:100px;}',
    Jsvalue: 'console.log("1")',
    Modal : {isModalOpen: false, childComponent: null},
    LibraryList : [],
    UpdateNumber: 0,
    AutoRunCheck: true,
    LibIdNum:0
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
                LibraryList: [...state.LibraryList,{id:state.LibIdNum++,url:action.payload}]
            });
        case Action.MODIFYURL:
            const findIndex = state.LibraryList.findIndex((ele)=>ele.id === action.payload.index);
            return Object.assign({},state,{
                LibraryList: [...state.LibraryList.slice(0,findIndex),{...state.LibraryList[findIndex],url:action.payload.URL},...state.LibraryList.slice(findIndex+1)]
            });
        case Action.REMOVEURL:
            const findIndex2 = state.LibraryList.findIndex((ele)=>ele.id === action.payload.index);
            return Object.assign({},state,{
                LibraryList: [...state.LibraryList.slice(0,findIndex2),...state.LibraryList.slice(findIndex2+1)]
            });
        case Action.UPDATENUMBER:
            return Object.assign({},state,{
                UpdateNumber: state.UpdateNumber+1
            });
        case Action.AUTORUNCHECK:
            return Object.assign({},state,{
                AutoRunCheck: !state.AutoRunCheck
            });
        default: return state;
    }
}

export default MainReducer;