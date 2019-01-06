import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import {connect} from 'react-redux';
import './login.scss';
import Actions from '../../actions/actionType';
import Spinner from '../../CommonComponent/Spinner/spinner';
class login extends Component {


    state = {
        ID: "",
        PassWord: ""
    }
    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.requestLogin(ev.target.ID.value, ev.target.PassWord.value)
        .then(()=>{this.props.history.replace('/');}).catch((error)=>alert(error.message));
    }

    handleChange = (ev) => {
        const name = ev.target.name;
        this.setState({
            [name] : ev.target.value
        });
    }

    componentDidMount() {
        console.log("mount");
        if(sessionStorage.getItem('token')){
            alert("이미로그인되었습니다.");
            this.props.history.replace('/');
        }
    }
    
    render() {
        if(this.props.pending){
            return (
                <div className="SpinnerBox">
                    <Spinner></Spinner>
                </div>
            )
        }
        return (
            <div className="LoginBody">
                <div className="LoginBox">
                    <Link to='/'>CODE FUN</Link>
                    <div className="Card">
                        <div className="Card__top">
                            Login
                        </div>        
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input type="text" name="ID" value={this.state.ID} onChange={this.handleChange}></input>
                            </div>
                            <div>
                                <input type="password" name="PassWord" value={this.state.PassWord} onChange={this.handleChange}></input>
                            </div>
                            <input type="submit" value="Login"></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> ({
    isLoggedin: state.UserInfo.isLoggedin,
    pending: state.UserInfo.pending,
});
const mapDispatchToProps = (dispatch) => ({
    requestLogin : (userid,userPassword)=> dispatch(Actions.loginRequestThunk(userid,userPassword))
});


export default connect(mapStateToProps,mapDispatchToProps)(login);