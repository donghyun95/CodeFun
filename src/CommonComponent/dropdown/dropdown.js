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
        console.log(this.props.JqueryAdd);
        return (
            <div className={cx('dropdown')}>
                <button onClick={this.toggleContent} className={cx('dropBtn')}>선택</button>
                <div className={cx({hide:!this.state.isClicked},'dropdownMenu')}>
                    <div onClick={this.props.ReactAdd}>React + ReactDOM 15.1.0</div>
                    <div onClick={this.props.VueAdd}>Latest Vue</div>
                    <div onClick={this.props.AngularAdd}>Angular 1.6.9 Stable</div>
                    <div onClick={this.props.JqueryAdd}>Jquery-3.3.1</div>
                    <div onClick={this.props.VelocityAdd}>Velocity 2.0.3</div>
                    <div onClick={this.props.LodashAdd}>Lodash 4.17.11</div>
                </div>
            </div>
        );
    }
}

export default dropdown;