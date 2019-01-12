import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import './fobidden.scss';
const forbidden = ({history}) => {
    return (
        <div className="fobidden">
            <span>
            <FontAwesomeIcon icon={faFrown} size="10x"></FontAwesomeIcon>
            </span>
            <div>
                <div>404</div>
                <div>Page Not Found</div>
            </div>
            <span className="fobidden__backBtn" onClick={()=>{history.goBack()}}>back</span>
        </div>
    );
};

export default forbidden;