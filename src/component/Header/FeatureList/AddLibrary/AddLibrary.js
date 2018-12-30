import React, { Component } from 'react';
import './AddLib.scss';
import cx from 'classnames';
import DropDown from '../../../../CommonComponent/dropdown/dropdown';
import {connect} from 'react-redux';
import Actions from '../../../../actions/actionType';
class AddLibrary extends Component {
    render() {
        return (
            <div className={cx('AddLibrary')} onClick={(ev)=>{ev.stopPropagation();}}>
                <div className={cx('header')}>
                    <div className={cx('AddLibrary-Header_text')}>ADD Library</div>
                    <button className={cx('closeBtn')} onClick={this.props.closeModal}>Close</button>
                </div>
                <div className={cx('main')}>
                    <DropDown ReactAdd={this.props.ReactAdd} VueAdd={this.props.VueAdd} AngularAdd={this.props.AngularAdd}></DropDown>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,OwnProps) => ({
    closeModal: OwnProps.closeModal,
    libList : state.LibraryList
});

const mapDispatchToProps = (dispatch) => ({
    ReactAdd : () => {dispatch(Actions.addlibrary("https://fb.me/react-15.1.0.js"));dispatch(Actions.addlibrary("https://fb.me/react-dom-15.1.0.js"));},
    VueAdd : () => dispatch(Actions.addlibrary("https://unpkg.com/vue")),
    AngularAdd : () => dispatch(Actions.addlibrary("https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.min.js")),
    dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(AddLibrary);