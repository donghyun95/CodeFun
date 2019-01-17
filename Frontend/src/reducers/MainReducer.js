import Action from '../actions/actionType';

const InitialState = {
    Title: "No Title",
    userId: "",
    Htmlvalue: "",
    Cssvalue: "",
    Jsvalue: "",
    Modal: { isModalOpen: false, childComponent: null },
    LibraryList: [],
    UpdateNumber: 0,
    AutoRunCheck: true,
    LibIdNum: 0,
    pending: false,
    error: false,
    ProjectId: null
}


function MainReducer(state = InitialState, action) {

    switch (action.type) {
        case Action.CHANGEHTML:
            return Object.assign({}, state, {
                Htmlvalue: action.payload
            });
        case Action.CHANGECSS:
            return Object.assign({}, state, {
                Cssvalue: action.payload
            });

        case Action.CHANGEJS:
            return Object.assign({}, state, {
                Jsvalue: action.payload
            });

        case Action.CHANGETITLE:
            return Object.assign({}, state, {
                Title: action.payload
            });

        case Action.CHANGEMODAL:
            return Object.assign({}, state, {
                Modal: { isModalOpen: action.payload.bool, childComponent: action.payload.component, url: action.payload.url }
            });
        case Action.ADDLIBRARY:
            return Object.assign({}, state, {
                LibraryList: [...state.LibraryList, { id: state.LibIdNum++, url: action.payload }]
            });
        case Action.MODIFYURL:
            const findIndex = state.LibraryList.findIndex((ele) => ele.id === action.payload.index);
            return Object.assign({}, state, {
                LibraryList: [...state.LibraryList.slice(0, findIndex), { ...state.LibraryList[findIndex], url: action.payload.URL }, ...state.LibraryList.slice(findIndex + 1)]
            });
        case Action.REMOVEURL:
            const findIndex2 = state.LibraryList.findIndex((ele) => ele.id === action.payload);
            return Object.assign({}, state, {
                LibraryList: [...state.LibraryList.slice(0, findIndex2), ...state.LibraryList.slice(findIndex2 + 1)]
            });
        case Action.UPDATENUMBER:
            return Object.assign({}, state, {
                UpdateNumber: state.UpdateNumber + 1
            });
        case Action.AUTORUNCHECK:
            return Object.assign({}, state, {
                AutoRunCheck: !state.AutoRunCheck
            });
        case Action.APPINIT:
            return Object.assign({}, state, {
                Title: action.payload.Title,
                userId: action.payload.userId,
                Htmlvalue: "",
                Cssvalue: "",
                Jsvalue: "",
                LibraryList: [],
                LibIdNum: 0,
            });
        case Action.PROJECTREQUEST_PENDING:
            return Object.assign({},state, {
                pending: true,
                error: false
            })
        case Action.PROJECTREQUEST_SUCCESS:
            return Object.assign({},state, {
                pending: false,
                error: false,
            },action.payload.content,{ProjectId: action.payload._id});
        case Action.PROJECTREQUEST_FAIL:
            return Object.assign({},state, {
                pending: false,
                error: true,
            });
        case Action.PROJECTSAVE_SUCCESS:
            return Object.assign({},state,{
                pending: false,
                error: false
            });
        default: return state;
    }
}

export default MainReducer;