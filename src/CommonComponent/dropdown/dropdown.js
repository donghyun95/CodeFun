import React, { Component } from 'react';
import cx from 'classnames';
import './dropdown.scss';


class dropdown extends Component {
    state = {
        isClicked : false
    }
    toggleContent = (ev) => {
        
        this.setState((state)=>({
            isClicked: true
        }));
        document.addEventListener('click',this.removeVisible);
    }

    removeVisible = () => {
        this.setState((state)=>({
            isClicked : false
        }));
        document.removeEventListener('click',this.removeVisible);
    }

    render() {
        return (
            <div className={cx('dropdown')}>
                <button onClick={this.toggleContent} className={cx('dropBtn')}>choice!</button>
                <div className={cx({hide:!this.state.isClicked},'dropdownMenu')}>
                    <div onClick={this.props.ReactAdd}>React + ReactDOM 15.1.0</div>
                    <div onClick={this.props.VueAdd}>Latest Vue</div>
                    <div onClick={this.props.AngularAdd}>Angular 1.4.0 Stable</div>
                </div>
            </div>
        );
    }
}

export default dropdown;