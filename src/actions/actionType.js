import axios from 'axios';


const CHANGEHTML = 'CHANGEHTML';
const CHANGECSS = 'CHANGECSS';
const CHANGEJS = 'CHANGEJS';
const CHANGETITLE = 'CHANGETITLE';
const CHANGEMODAL = 'CHANGEMODAL';

const ADDLIBRARY = 'ADDLIBRARY';
const MODIFYURL = 'MODIFYURL';
const REMOVEURL = 'REMOVEURL';

const UPDATENUMBER = 'UPDATENUMBER';

const AUTORUNCHECK = 'AUTORUNCHECK';

const APPINIT = 'APPINIT';


const USERREQUEST_PENDING = 'USERREQURSTPENDING';
const USERREQUEST_SUCCESS = 'USERREQUESTSUCCESS';
const USERREQUEST_FAIL = 'USERREQUESTFAIL';
const REGISTERREQUEST_SUCCESS =  'REGISTERREQUEST_SUCCESS';
const REGISTERREQUEST_FAIL = 'REGISTERREQUEST_FAIL';
const PROJECTREQUEST_PENDING = 'PROJECTREQUEST_PENDING';
const PROJECTREQUEST_SUCCESS = 'PROJECTREQUEST_SUCCESS';
const PROJECTREQUEST_FAIL = 'PROJECTREQUREST_FAIL';
const PROJECTSAVE_SUCCESS = 'PROJECTSAVE_SUCCESS';
const changehtml = (value) => {
    return {
        type: CHANGEHTML,
        payload: value
    }
};

const changecss = (value) => {
    return {
        type: CHANGECSS,
        payload: value
    }
};

const changejs = (value) => {
    return {
        type: CHANGEJS,
        payload: value
    }
};

const changetitle = (value) => {
    return {
        type: CHANGETITLE,
        payload: value
    }
}

const changemodal = (Obj) => {
    return {
        type: CHANGEMODAL,
        payload: Obj
    }
};

const addlibrary = (URL) => {
    return {
        type: ADDLIBRARY,
        payload: URL
    }
};

const modifyurl = ({ index, URL }) => {
    return {
        type: MODIFYURL,
        payload: { index, URL }
    }
}

const removeurl = (index) => {
    return {
        type: REMOVEURL,
        payload: index
    }
}

const updatenumber = () => {
    return {
        type: UPDATENUMBER
    }
}

const autoruncheck = () => {
    return {
        type: AUTORUNCHECK
    }
}

const userrequest_pending = () => {
    return {
        type: USERREQUEST_PENDING
    }
}

const userrequest_success = (result) => {
    return {
        type: USERREQUEST_SUCCESS,
        payload: result
    }
}

const userrequest_fail = () => {
    return {
        type: USERREQUEST_FAIL
    }
}

const registerrequest_success = () => {
    return {
        type: REGISTERREQUEST_SUCCESS
    }
}

const registerrequest_fail = () => {
    return {
        type: REGISTERREQUEST_FAIL
    }
}

const appinit = (userId, Title) => {
    return {
        type: APPINIT,
        payload: {
            userId,
            Title
        }
    }
}

const projectrequest_pending = () => {
    return {
        type: PROJECTREQUEST_PENDING
    }
}

const projectrequest_success = (data) => {
    return {
        type: PROJECTREQUEST_SUCCESS,
        payload: data
    }
}
const projectrequest_fail = () => {
    return {
        type: PROJECTREQUEST_FAIL
    }
}

const projectsave_success = () => {
    return {
        type: PROJECTSAVE_SUCCESS
    }
}

const checkLoginThunk = function (token) {
    return function (dispatch) {
        dispatch(userrequest_pending());

        return axios({
            method: 'get',
            url: '/api/checkLogin',
            params: {
                token
            }
        }).then((respone) => dispatch(userrequest_success(respone.data.result))).catch((err) => { dispatch(userrequest_fail()); throw new Error("로그인 유효시간이 만료되었습니다.") })
    }
}

const loginRequestThunk = function (userid, userPassword) {
    return function (dispatch) {
        //요청시작하기전
        dispatch(userrequest_pending());

        //요청시작하기
        return axios({
            method: 'post',
            url: '/api/login',
            data: {
                ID: userid,
                PASSWORD: userPassword
            }
        }).then((result) => { console.log(result); sessionStorage.setItem('token', result.data.result.token); dispatch(userrequest_success(result.data.result)); })
            .catch((error) => { dispatch(userrequest_fail()); throw new Error("로그인에 실패하였습니다."); });
    }
}

const registerRequestThunk = function(userid, userPassword) {
    return function (dispatch) {
        dispatch(userrequest_pending());

        return axios({
            method: 'post',
            url: '/api/adduser',
            data: {
                ID: userid,
                PASSWORD: userPassword
            }
        }).then(()=>dispatch(registerrequest_success())).catch((err)=>{console.log("에러발생");dispatch(registerrequest_fail()); throw new Error(err);});
    }
}


const projectRequestThunk = function (projectId) {
    return function (dispatch) {
        dispatch(projectrequest_pending());

        return axios.get(`/api/project/${projectId}`)
            .then((result) => {
                console.log(result.data.result);
                dispatch(projectrequest_success(result.data.result));
            }).catch((error) => { console.log("에러발생"); dispatch(projectrequest_fail()); throw new Error("프로젝트가 없습니다.") });
    }
}

const projectSaveThunk = function (token) {
    return function (dispatch, getState) {
        dispatch(projectrequest_pending());
        dispatch(changemodal({ bool: true, component: null }));
        let State = getState();
        //pending과 modal 변경
        const newProject = Object.assign({}, State.Project, { pending:false,Modal:{isModalOpen: false,childComponent: null},ProjectId: null });
        console.log(newProject);
        if (State.UserInfo.isLoggedin && State.UserInfo.USERObjectId) {
            return axios({
                method: 'post',
                url: '/api/projectAdd',
                params: {
                    token
                },
                data: {
                    content: newProject,
                    creator: State.UserInfo.USERObjectId
                }
            }).then((respone) => {dispatch(projectsave_success()); dispatch(changemodal({ bool: true, component: 'Save', url: `http://localhost:3000/project/${respone.data.result._id}` })) })
                .catch((err) => { dispatch(projectrequest_fail());dispatch(changemodal({ bool: false, component: null })); throw new Error("저장실패"); });
        } else {
            console.log('왜실패지');
            alert('저장실패');
            dispatch(changemodal({ bool: false, component: null }));
        }
       
    }
}

// axios({
//     method: 'post',
//     url: '/adduser',
//     data: {
//         ID: userid, 
//         PASSWORD: userPassword
//     }




export default {
    CHANGECSS, CHANGEHTML, CHANGEJS, CHANGETITLE,CHANGEMODAL, ADDLIBRARY, MODIFYURL, REMOVEURL, UPDATENUMBER, AUTORUNCHECK,
    USERREQUEST_FAIL, USERREQUEST_PENDING, USERREQUEST_SUCCESS,REGISTERREQUEST_SUCCESS,REGISTERREQUEST_FAIL, APPINIT, PROJECTREQUEST_PENDING, PROJECTREQUEST_SUCCESS, 
    PROJECTREQUEST_FAIL,PROJECTSAVE_SUCCESS,

    changecss, changehtml, changejs, changetitle,changemodal, addlibrary, modifyurl, removeurl, updatenumber, autoruncheck,
    userrequest_fail, userrequest_pending, userrequest_success,registerrequest_success,registerrequest_fail, appinit, projectrequest_fail, projectrequest_success, projectrequest_pending,

    loginRequestThunk, projectRequestThunk, checkLoginThunk, projectSaveThunk,registerRequestThunk
};