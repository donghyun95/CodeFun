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
    
    render() {
        return (
            <div className="InputType">
                <div>Script</div>
                <input value={this.state.InputValue} onChange={this.Change}></input>
                <button onClick={()=>{this.props.dispatchUrl(this.state.InputValue); this.setState({InputValue:""});}}>추가</button>
            </div>
        );
    }
}

export default InputType;