import React, { Component } from 'react';
import './AddLib.scss';
import cx from 'classnames';
import DropDown from '../../../../CommonComponent/dropdown/dropdown';
import Input from '../../../../CommonComponent/Input/InputType';
import LibItem from '../../../../CommonComponent/LibraryList/list';
import {connect} from 'react-redux';
import Actions from '../../../../actions/actionType';

class AddLibrary extends Component {

    render() {
        const {dispatch} = this.props;
        const LibList = this.props.libList.map((item,index)=>(<LibItem url={item} key={index} dispatchFunc={dispatch} index={index}></LibItem>))
        console.log('새로렌더링');
        return (
            <div className={cx('AddLibrary')} onClick={(ev)=>{ev.stopPropagation();}}>
                <div className={cx('header')}>
                    <div className={cx('AddLibrary-Header_text')}>ADD Library</div>
                    <button className={cx('closeBtn')} onClick={this.props.closeModal}>Close</button>
                </div>
                <div className={cx('main')}>
                    <DropDown ReactAdd={this.props.ReactAdd} VueAdd={this.props.VueAdd} AngularAdd={this.props.AngularAdd}></DropDown>
                    <Input dispatchUrl={this.props.dispatchUrl}></Input>
                </div>
                <div>
                    {LibList}
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
    ReactAdd : () => {dispatch(Actions.addlibrary("https://fb.me/react-0.14.7.js"));dispatch(Actions.addlibrary("https://fb.me/react-dom-0.14.7.js"));},
    VueAdd : () => dispatch(Actions.addlibrary("https://unpkg.com/vue")),
    AngularAdd : () => dispatch(Actions.addlibrary("https://code.angularjs.org/snapshot/angular.min.js")),
    dispatchUrl : (Url) => dispatch(Actions.addlibrary(Url)),
    dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(AddLibrary);