import React, { Component } from 'react';
import './sNs.scss';
class sNs extends Component {
    render() {
        return (
            <div className='sNsBox' onClick={(ev)=>{ev.stopPropagation();}}>
                <span>adnjnwdnkadnkadnkansknkadnkandjkadnkadnjkadnjkadnskadnjaksnskadna</span>
            </div>
        );
    }
}

export default sNs;