import React from 'react';
import './Title.scss';
const TitleName = ({title,userId}) => {
    return (
        <div className={'TitleBox'}>
            <div className='Title'>
                {title}
            </div>
            <div className='UserId'>
               A PEN BY {userId}
            </div>
        </div>
    );
};

export default TitleName;