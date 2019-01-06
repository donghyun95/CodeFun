import React, { Component } from 'react';
import Title from './Title';
import FeatureList from './FeatureList/FeatureList';
import './Header.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Route, Link, Switch,withRouter,Redirect } from "react-router-dom"
class Header extends Component {

    render() {
        return (
            <div className={'Header'}>
                    <div className='Header__home' onClick={(ev)=>{this.props.history.push('/login');}}>
                        <span>
                            <FontAwesomeIcon icon={faLaptopCode} size={"2x"} />
                        </span>
                    </div>
                <Title/>
                <FeatureList/>
                <Link to='project/5c31f39aa23db901ec8b3601'>asdsa</Link>
            </div>
        );
    }
}

export default withRouter(Header);