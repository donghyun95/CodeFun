import React from 'react';
import './userFind.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
const proejectItem = ({creator,createdDate,starNum,isOwner,handleRemove, projectID, projectTitle}) => {
    return (
        <div className="projectItem">
            <div className="projectItem__Title">
                <div className="TitleBox">
                    <Link to={`/project/${projectID}`}>
                        <div className="TitleBox__Title">
                           {projectTitle} 
                        </div>
                        <div className="TitleBox__Create">
                            <div>
                                {createdDate}
                            </div>
                            <div>
                                By  {creator}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="projectItem__star">
                    <span className="starColor">
                        <FontAwesomeIcon icon={faStar} size='1x'></FontAwesomeIcon>
                    </span>
                    <span>{starNum}</span>
                </div>
            </div>
            {
                isOwner ? 
                <span onClick={handleRemove} className="projectItem__remove">
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span> : null
            }
        </div>
    );
};

export default proejectItem;