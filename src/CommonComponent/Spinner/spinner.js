import React from 'react';
import './spinner.scss';
const spinner = () => {
    return (
        <div className="Spinner-one">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default spinner;