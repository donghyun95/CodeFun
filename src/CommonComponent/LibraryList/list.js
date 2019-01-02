import React, { Component } from 'react';
import Actions from '../../actions/actionType';
import './LibraryList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faTimes} from '@fortawesome/free-solid-svg-icons'
class list extends Component {

    state = {
        isDblClicked: false,
        inputValue: this.props.url
    }
    Change = (ev) => {
        this.setState({
            ...this.state,
            inputValue: ev.target.value
        })
    }

    DblClick = () => {
        this.setState({
            ...this.state,
            isDblClicked: true
        });
    }

    modifyUrl = () => {
        this.setState({
            ...this.state,
            isDblClicked: false
        });
        this.props.dispatchFunc(Actions.modifyurl({ index: this.props.index, URL: this.state.inputValue }));
    }

    removeUrl = () => {
        this.setState({
            ...this.state,
            isDblClicked: false,
        });
        this.props.dispatchFunc(Actions.removeurl({index:this.props.index}));
    }

    render() {
        if (this.state.isDblClicked) {
            return (
                <div className="modifyUrlBox">
                    <input value={this.state.inputValue} onChange={this.Change}></input>
                    <span className="libitemBox_confirmicon" onClick={this.modifyUrl}>
                    <FontAwesomeIcon icon={faLockOpen} size="1x"/>
                    </span>
                    <span className="libitemBox_removeicon" onClick={this.removeUrl}>
                        <FontAwesomeIcon icon={faTimes} size="1x"/>
                    </span>
                </div>
            )
        }
        return (
            <div onDoubleClick={this.DblClick} className="libitemBox">
                <div className="libitemBox_url">{this.props.url}</div>
                <span className="libitemBox_modifyicon" onClick={this.DblClick}>
                    <FontAwesomeIcon icon={faLock} size="1x"/>
                </span>
                <span className="libitemBox_removeicon" onClick={this.removeUrl}>
                    <FontAwesomeIcon icon={faTimes} size="1x"/>
                </span>
            </div>
        );
    }
}

export default list;