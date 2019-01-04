import React, { Component } from 'react';
import Title from './Title';
import FeatureList from './FeatureList/FeatureList';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
class Header extends Component {

    render() {
        return (
            <div className={'Header'}>
                <FontAwesomeIcon icon={faHeart} size={"2x"} />
                <Title userId={this.props.userId} title={this.props.Title} />
                <FeatureList/>
            </div>
        );
    }
}

export default Header;