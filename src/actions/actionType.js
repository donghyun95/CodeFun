const CHANGEHTML = 'CHANGEHTML';
const CHANGECSS  = 'CHANGECSS';
const CHANGEJS   = 'CHANGEJS';

const CHANGEMODAL = 'CHANGEMODAL';

const ADDLIBRARY = 'ADDLIBRARY';
const MODIFYURL = 'MODIFYURL';
const REMOVEURL = 'REMOVEURL';

const UPDATENUMBER = 'UPDATENUMBER';

const AUTORUNCHECK = 'AUTORUNCHECK';

const changehtml = (value) => {
    return {
        type: CHANGEHTML,
        payload: value
    }
};

const changecss = (value) => {
    return {
        type: CHANGECSS,
        payload : value
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

const modifyurl = ({index, URL}) => {
    return {
        type: MODIFYURL,
        payload: {index, URL}
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

export default {CHANGECSS,CHANGEHTML,CHANGEJS,CHANGEMODAL,ADDLIBRARY,MODIFYURL,REMOVEURL,UPDATENUMBER,AUTORUNCHECK,changecss,changehtml,changejs,changemodal,addlibrary,modifyurl,removeurl,updatenumber,
    autoruncheck
};