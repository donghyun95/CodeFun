import axios from 'axios';


const CHANGEHTML = 'CHANGEHTML';
const CHANGECSS = 'CHANGECSS';
const CHANGEJS = 'CHANGEJS';

const CHANGEMODAL = 'CHANGEMODAL';

const ADDLIBRARY = 'ADDLIBRARY';
const MODIFYURL = 'MODIFYURL';
const REMOVEURL = 'REMOVEURL';

const UPDATENUMBER = 'UPDATENUMBER';

const AUTORUNCHECK = 'AUTORUNCHECK';


const USERREQUEST_PENDING = 'USERREQURSTPENDING';
const USERREQUEST_SUCCESS = 'USERREQUESTSUCCESS';
const USERREQUEST_FAIL = 'USERREQUESTFAIL';



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

const userrequest_success = () => {
    return {
        type: USERREQUEST_SUCCESS
    }
}

const userrequest_fail = () => {
    return {
        type: USERREQUEST_FAIL
    }
}



const loginRequestThunk = function (userid, userPassword) {
    return function (dispatch) {
        //요청시작하기전
        dispatch(userrequest_pending());

        //요청시작하기
        return axios.get('https://jsonplaceholder.typicode.com/posts/1')
               .then((result)=>{console.log(result); dispatch(userrequest_success());}).catch((error)=>{dispatch(userrequest_fail()); throw new Error("로그인에 실패하였습니다.");});
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
    CHANGECSS, CHANGEHTML, CHANGEJS, CHANGEMODAL, ADDLIBRARY, MODIFYURL, REMOVEURL, UPDATENUMBER, AUTORUNCHECK,
    USERREQUEST_FAIL,USERREQUEST_PENDING,USERREQUEST_SUCCESS,
    
    
    changecss, changehtml, changejs, changemodal, addlibrary, modifyurl, removeurl, updatenumber,autoruncheck,
    userrequest_fail,userrequest_pending,userrequest_success,

    loginRequestThunk,
};