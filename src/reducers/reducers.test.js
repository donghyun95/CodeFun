import Action from '../actions/actionType';
import BoardReducers from './BoardReducer';
import MainReducer from './MainReducer';
import UserInfoReducer from './UserInfoReducer';

describe('BoardReducers', () => {
    let state = null;
    const initialState = {
        postList : [],
        pending: false,
        isLast : false
    };
    it('should return initialState', () => {
        state = BoardReducers(undefined, {});
        expect(state).toEqual(initialState);
    });

    it('should return pending true', () => {
        state = BoardReducers(state,Action.boardrequest_pending());
        expect(state).toEqual({...initialState,pending: true});
    });

    it('should return SuccessState', () => {
        const mockData =[{test: "1"},{test: "2"},{test: "3"},{test: "4"}];
        state = BoardReducers(state,Action.boardrequest_initsuccess(mockData));
        expect(state).toEqual({
            ...state,
            pending:false,
            postList: [{test: "1"},{test: "2"},{test: "3"},{test: "4"}]
        });
        expect(state.postList.length).toBe(4);
    });

    it('should receive newPost', () => {
        const mockData = [{test: "NewData"},{test: "NewData"},{test: "NewData"},{test: "NewData"}]
        state = BoardReducers(state,Action.boardrequest_newsuccess(mockData));
        expect(state).toEqual({
            ...state,
            postList: [{test: "NewData"},{test: "NewData"},{test: "NewData"},{test: "NewData"},{test: "1"},{test: "2"},{test: "3"},{test: "4"}]
        });
        expect(state.postList.length).toBe(8);
    });

    it('should receive oldPost', () => {
        const mockData = [{test: "OldData"},{test: "OldData"},{test: "OldData"},{test: "OldData"}];
        state = BoardReducers(state, Action.boardrequest_oldsuccess(mockData));
        expect(state).toEqual({
            ...state,
            postList: [{test: "NewData"},{test: "NewData"},{test: "NewData"},{test: "NewData"},
            {test: "1"},{test: "2"},{test: "3"},{test: "4"},{test: "OldData"},
            {test: "OldData"},{test: "OldData"},{test: "OldData"}]
        });
        expect(state.postList.length).toBe(12);
    });

    it('shoild return pending fail', () => {
        state = BoardReducers(state, Action.boardrequest_fail());
        expect(state).toEqual({
            ...state,
            pending: false
        });
    });

    it('should return last true', () => {
        state = BoardReducers(state, Action.boardrequest_last());
        expect(state).toEqual({
            ...state,
            isLast : true
        });
    });
});

describe('MainReducer', () => {
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

    let state = null;

    it('should return initialState', () => {
        state = MainReducer(undefined, {});
        expect(state).toEqual(InitialState);
    });
    
    it('should change html ,css ,js, title value', () => {
        state = MainReducer(state,Action.changehtml('htmlTest'));
        expect(state.Htmlvalue).toBe('htmlTest');
        state = MainReducer(state, Action.changecss('cssTest'));
        expect(state.Cssvalue).toBe('cssTest');
        state = MainReducer(state,Action.changejs('jsTest'));
        expect(state.Jsvalue).toBe('jsTest');
        state = MainReducer(state,Action.changetitle('titleTest'));
        expect(state.Title).toBe('titleTest');
        expect(state).toEqual({
            ...InitialState,
            Htmlvalue: 'htmlTest',
            Cssvalue: 'cssTest',
            Jsvalue:  'jsTest',
            Title: 'titleTest'
        });
    });

    it('should receive Modal data', () => {
        const mockModalData = {
            bool: true,
            component : 'Test',
            url : 'http:www.codefun.site'
        }
        state = MainReducer(state, Action.changemodal(mockModalData));
        expect(state.Modal.isModalOpen).toBe(true);
        expect(state.Modal.childComponent).toBe('Test');
        expect(state.Modal.url).toBe('http:www.codefun.site');
    });
    it('should Add library', () => {
        state = MainReducer(state, Action.addlibrary('https://cdn.jsdelivr.net/npm/vue'));
        expect(state.LibraryList.length).toBe(1);
        expect(state.LibraryList).toEqual([{id: 0, url: 'https://cdn.jsdelivr.net/npm/vue'}]);
        state = MainReducer(state, Action.addlibrary('https://cdn.jsdelivr.net/Test'));
        expect(state.LibraryList.length).toBe(2);
        expect(state.LibraryList).toEqual([{id: 0, url: 'https://cdn.jsdelivr.net/npm/vue'},{id:1 , url: 'https://cdn.jsdelivr.net/Test'}]);
    });
    it('should return modifiedurl state', () => {
        state = MainReducer(state, Action.modifyurl({index:0,URL: 'testurl'}));
        expect(state.LibraryList[0].url).toBe('testurl');
    });
    it('should return removedLibraryList state', () => {
        state = MainReducer(state, Action.removeurl(1));
        expect(state.LibraryList.length).toBe(1);
        expect(state.LibraryList[1]).toBe(undefined);
    });

    it('should return initialized state', () => {
        state = MainReducer(state, Action.appinit('test','test Title'));
        expect(state.Title).toBe('test Title');
        expect(state.userId).toBe('test');
        expect(state.Htmlvalue).toBe('');
        expect(state.Cssvalue).toBe('');
        expect(state.Jsvalue).toBe('');
        expect(state.LibraryList.length).toBe(0);
        expect(state.LibIdNum).toBe(0);
    });

    describe('ProjectRequest', () => {
        state = MainReducer(undefined,{});
        const MockData = {
            "createDate": "2019-01-14T08:45:43.952Z",
            "stars": [],
            "_id": "5c3c4c38a15a21061c50d818",
            "content": {
                "Title": "No Title",
                "userId": "t99480",
                "Htmlvalue": "testTest",
                "Cssvalue": "testTest1",
                "Jsvalue": "testTest2",
                "Modal": {
                    "isModalOpen": false,
                    "childComponent": null
                },
                "LibraryList": [],
                "UpdateNumber": 0,
                "AutoRunCheck": true,
                "LibIdNum": 0,
                "pending": false,
                "error": false,
                "ProjectId": null
            }
        }
        it('should return pending true', () => {
            state = MainReducer(state, Action.projectrequest_pending());
            expect(state.pending).toBe(true);    
        });
        it('should return content', () => {
            state = MainReducer(state, Action.projectrequest_success(MockData));
            expect(state.pending).toBe(false);
            expect(state.Title).toBe('No Title');
            expect(state.userId).toBe('t99480');
            expect(state.Htmlvalue).toBe('testTest');
            expect(state.Cssvalue).toBe('testTest1');
            expect(state.Jsvalue).toBe('testTest2');
            expect(state.LibraryList.length).toBe(0);
            expect(state.Modal).toEqual({
                isModalOpen: false,
                childComponent: null
            });
        });
        it('should return error true', () => {
            state = MainReducer(state, Action.projectrequest_fail());
            expect(state.pending).toBe(false);
            expect(state.error).toBe(true);
        }); 
    });
});

describe('UserInfoReducer', () => {
    let state = null;
    const InitialState = {
        USERObjectId: null,
        USER: null,
        isLoggedin : false,
        pending: false,
        error: false,
    };
    it('should return initialState', () => {
        state = UserInfoReducer(undefined, {});
        expect(state).toEqual(InitialState);
    });

    it('should return pending true', () => {
        state = UserInfoReducer(state, Action.userrequest_pending());
        expect(state.pending).toBe(true);
        expect(state.error).toBe(false);
    });

    it('should return state contain UserInfo', () => {
        state = UserInfoReducer(state , Action.userrequest_success({userObjectId:'5c3c4c38a15a21061c50d818',userId: 't99480'}));
        expect(state.pending).toBe(false);
        expect(state.isLoggedin).toBe(true);
        expect(state.USERObjectId).toBe('5c3c4c38a15a21061c50d818');
        expect(state.USER).toBe('t99480');
    });

    it('should return state requestfail', () => {
        state = UserInfoReducer(state, Action.userrequest_fail());
        expect(state.error).toBe(true);
        expect(state.isLoggedin).toBe(false);
        expect(state.USERObjectId).toBe(null);
        expect(state.USER).toBe(null);
    });

    it('should return Register success', () => {
        state = UserInfoReducer(state, Action.userrequest_pending());
        state = UserInfoReducer(state, Action.registerrequest_success());
        expect(state.pending).toBe(false);
    });

    it('should return Register fail', () => {
        state = UserInfoReducer(state, Action.userrequest_pending());
        state = UserInfoReducer(state, Action.registerrequest_fail());
        expect(state.pending).toBe(false);
        expect(state.error).toBe(true);
    });
});