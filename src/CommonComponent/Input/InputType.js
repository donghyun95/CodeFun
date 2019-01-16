import React, { Component } from 'react';
import './InputType.scss';
class InputType extends Component {

    state = {
        InputValue: ""
    }

    constructor(props) {
        super(props);
        this.AddBtnClick = this.AddBtnClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.Change = this.Change.bind(this);
    }
    
    Change(ev) {
        this.setState({
            InputValue: ev.target.value
        });
    }
    
    AddBtnClick(value) {
        if(value.length > 0) {
            this.props.dispatchUrl(value);
            this.setState({InputValue: ""});
        }
    }

    handleClick(ev) {
        this.AddBtnClick(this.state.InputValue);
    }
    
    render() {
        return (
            <div className="InputType">
                <h2>ADD LIBRARY</h2>
                <input value={this.state.InputValue} onChange={this.Change}></input>
                <button className="libAddbtn" onClick={this.handleClick}>ADD</button>
            </div>
        );
    }
}

export default InputType;