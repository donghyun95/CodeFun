import React from 'react';
import './Search.scss';
import {Link} from 'react-router-dom';
const userItem = ({userName, closeModal}) => {
    return (
        <Link to={`/userFind/${userName}`} className="userLink">
            <div className="userItemBox" onClick={closeModal}>
                {userName}
            </div>
        </Link>
    );
};

export default userItem;