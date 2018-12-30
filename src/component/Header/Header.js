import React, { Component } from 'react';
import Title from './Title';
import FeatureList from './FeatureList/FeatureList';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
class Header extends Component {
    render() {
        return (
            <div className={'Header'}>
                <FontAwesomeIcon icon={faHeart} size={"2x"} />
                <Title userId='dongdonggri' title='일단뭐라도' />
                <FeatureList/>
            </div>
        );
    }
}

export default Header;