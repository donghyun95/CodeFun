import React, { Component } from 'react';
import {connect} from 'react-redux';
import Actions from '../../../..//actions/actionType';
import './AutoRun.scss';
class AutoRun extends Component {

    shouldComponentUpdate(prevProps,prevState) {
        return this.props.curAutoRun !== prevProps.curAutoRun;
    }

    render() {
        const {curAutoRun,AutoRunCheck} = this.props;
        return (
            <div onClick={AutoRunCheck} className="AutoRunBox">
                <input type="checkbox" checked={curAutoRun} readOnly></input>
                <span>AutoRun</span>
            </div>
        );
    }
}


export default connect((state)=>({
    curAutoRun : state.Project.AutoRunCheck
}),(dispatch)=>({AutoRunCheck: () => dispatch(Actions.autoruncheck())}))(AutoRun);