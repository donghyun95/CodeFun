import React from 'react';
import './Btn.scss';
const button = ({ children}) => {
    return (
        <button className='btn'>{children}</button>
    );
};

export default button;