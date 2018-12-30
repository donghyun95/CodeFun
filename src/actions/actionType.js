const CHANGEHTML = 'CHANGEHTML';
const CHANGECSS  = 'CHANGECSS';
const CHANGEJS   = 'CHANGEJS';

const CHANGEMODAL = 'CHANGEMODAL';

const ADDLIBRARY = 'ADDLIBRARY';

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

export default {CHANGECSS,CHANGEHTML,CHANGEJS,CHANGEMODAL,ADDLIBRARY,changecss,changehtml,changejs,changemodal,addlibrary};