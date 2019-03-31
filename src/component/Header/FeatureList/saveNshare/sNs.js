import React, { Component } from 'react';
import './sNs.scss';

const sNs = ({children}) => {
    return (
        <div className='sNsBox' onClick={(ev)=>{ev.stopPropagation();}}>
            <span>{children}</span>
        </div>
    );
};

export default sNs;


