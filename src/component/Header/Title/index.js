import React from 'react';
import './Title.scss';
const TitleName = ({title,userId}) => {
    return (
        <div className={'TitleBox'}>
            <div>
                {title}
            </div>
            <div>
               A PEN BY {userId}
            </div>
        </div>
    );
};

export default TitleName;