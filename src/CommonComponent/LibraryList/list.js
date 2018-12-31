import React, { Component } from 'react';
import Actions from '../../actions/actionType';
class list extends Component {

    state = {
        isDblClicked : false,
        inputValue : this.props.url
    }
    Change = (ev) => {this.setState({
        ...this.state,
        inputValue: ev.target.value
    })}

    DblClick = () => {
        this.setState({
            ...this.state,
            isDblClicked : true
        });
    }

    modifyUrl = () => {
        this.setState({
            ...this.state,
            isDblClicked: false
        });
        this.props.dispatchFunc(Actions.modifyurl({index:this.props.index,URL:this.state.inputValue}));
    }

    removeUrl = () => {
        this.setState({
            ...this.state,
            isDblClicked: false
        });
        this.props.dispatchFunc(Actions.removeurl(this.props.index));
    }

//()=>{this.props.removeUrl(); this.setState({...this.state,isDblClicked: false})}
    render() {
        if(this.state.isDblClicked){
            return (
                <div>
                    <input value={this.state.inputValue} onChange={this.Change}></input>
                    <button onClick={this.modifyUrl}>수정</button>
                    <button onClick={this.removeUrl}>삭제</button>
                </div>
            )
        }
        return (
            <div onDoubleClick={this.DblClick}>
                <span>{this.props.url}</span>
            </div>
        );
    }
}

export default list;