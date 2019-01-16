import React, { Component } from 'react';
import './InputType.scss';
class InputType extends Component {

    state = {
        InputValue: ""
    }

    Change = (ev) => {
        this.setState({
            InputValue: ev.target.value
        });
    }
    
    AddBtnClick = (value) => {
        if(value.length > 0) {
            this.props.dispatchUrl(value);
            this.setState({InputValue: ""});
        }
    }
    
    render() {
        return (
            <div className="InputType">
                <h2>ADD LIBRARY</h2>
                <input value={this.state.InputValue} onChange={this.Change}></input>
                <button className="libAddbtn" onClick={()=>this.AddBtnClick(this.state.InputValue)}>ADD</button>
            </div>
        );
    }
}

export default InputType;