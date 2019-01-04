import React, { Component } from 'react';
import './AddLib.scss';
import cx from 'classnames';
import DropDown from '../../../../CommonComponent/dropdown/dropdown';
import ScriptAddInput from '../../../../CommonComponent/Input/InputType';
import LibItem from '../../../../CommonComponent/LibraryList/list';
import {connect} from 'react-redux';
import Actions from '../../../../actions/actionType';

class AddLibrary extends Component {

    render() {
        const {dispatch} = this.props;
        const LibList = this.props.libList.map((item)=>(<LibItem url={item.url} key={item.id} dispatchFunc={dispatch} index={item.id}></LibItem>))
        return (
            <div className={cx('AddLibrary')} onClick={(ev)=>{ev.stopPropagation();}}>
                <div className={cx('header')}>
                    <div className={cx('AddLibrary-Header_text')}>Settings</div>
                    <button className={cx('closeBtn')} onClick={this.props.closeModal}>Close</button>
                </div>
                <div className={cx('main')}>
                    <DropDown ReactAdd={this.props.ReactAdd} VueAdd={this.props.VueAdd} AngularAdd={this.props.AngularAdd} JqueryAdd={this.props.JqueryAdd}
                      VelocityAdd={this.props.VelocityAdd} LodashAdd={this.props.LodashAdd}></DropDown>
                    <ScriptAddInput dispatchUrl={this.props.dispatchUrl}></ScriptAddInput>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('LibListBox')}>
                        {LibList}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,OwnProps) => ({
    closeModal: OwnProps.closeModal,
    libList : state.Project.LibraryList
});

const mapDispatchToProps = (dispatch) => ({
    ReactAdd : () => {dispatch(Actions.addlibrary("https://fb.me/react-0.14.7.js"));dispatch(Actions.addlibrary("https://fb.me/react-dom-0.14.7.js"));},
    VueAdd : () => dispatch(Actions.addlibrary("https://unpkg.com/vue")),
    AngularAdd : () => dispatch(Actions.addlibrary("https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js")),
    JqueryAdd : () => dispatch(Actions.addlibrary("https://code.jquery.com/jquery-3.3.1.min.js")),
    VelocityAdd: () => dispatch(Actions.addlibrary("//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js")),
    LodashAdd : () => dispatch(Actions.addlibrary("https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js")),
    dispatchUrl : (Url) => dispatch(Actions.addlibrary(Url)),
    dispatch
});

export default connect(mapStateToProps,mapDispatchToProps)(AddLibrary);