import React from 'react';
import './Search.scss';
import {Link} from 'react-router-dom';
const userItem = ({userName, closeModal}) => {
    return (
        <div className="userItemBox" onClick={closeModal}>
            <Link to={`/userFind/${userName}`} className="userLink">
                <span>{userName}</span>
            </Link>
        </div>
    );
};

export default userItem;