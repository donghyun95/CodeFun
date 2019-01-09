import React, { Component } from 'react';
import Title from './Title';
import FeatureList from './FeatureList/FeatureList';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import {withRouter} from "react-router-dom"

class Header extends Component {

    render() {
        return (
            <div className={'Header'}>
                <div className='Header__home' onClick={(ev) => { this.props.history.push('/'); }}>
                    <span>
                        <FontAwesomeIcon icon={faLaptopCode} size={"2x"} />
                    </span>
                </div>
                <Title />
                <FeatureList />
            </div>
        );
    }
}

export default withRouter(Header);