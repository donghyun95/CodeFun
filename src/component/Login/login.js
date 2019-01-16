import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux';
import './login.scss';
import Actions from '../../actions/actionType';
import Spinner from '../../CommonComponent/Spinner/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
class login extends Component {
    state = {
        ID: "",
        PassWord: "",
        loginFail: false
    }

    constructor(props) {
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleLoginSubmit(ev) {
        ev.preventDefault();
        this.props.requestLogin(ev.target.ID.value, ev.target.PassWord.value)
            .then(() => { this.props.history.replace('/'); })
            .catch((error) => {
                this.setState({
                    ...this.state,
                    loginFail: true,
                });
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        loginFail: false
                    });
                }, 1000);
            });
    }

    handleRegisterSubmit(ev) {
        ev.preventDefault();
        const { ID, PassWord } = ev.target;
        if (ID.value.length < 1 || PassWord.value.length < 1) {
            alert('1글자이상써주세요');
            return;
        }
        if (ID.value.length > 20 || PassWord.value.length > 20) {
            alert('20글자 이내로 작성해주세요');
            return;
        }
        this.props.requestRegister(ID.value, PassWord.value)
            .then(() => { this.props.history.push('/login'); alert('등록에 성공했습니다.'); })
            .catch(() => { alert('이미존재하는사용자이거나 특수문자를 넣었습니다.') });
    }

    handleChange(ev) {
        const name = ev.target.name;
        this.setState({
            [name]: ev.target.value
        });
    }

    componentDidMount() {
        if (!this.props.register) {
            if (sessionStorage.getItem('token')) {
                alert("이미로그인되었습니다.");
                this.props.history.replace('/');
            }
        }
    }

    render() {
        const { register } = this.props;
        if (this.props.pending) {
            return (
                <div className="SpinnerBox">
                    <Spinner></Spinner>
                </div>
            )
        }
        return (
            <div className="LoginBody">
                <div className="LoginBox">
                    <div className="LoginBox__Cover">
                        <Link to='/'>CODE FUN</Link>
                        <div className={cx('Card', { loginFail: this.state.loginFail })}>
                            <div className="Card__top">
                                {register ? 'Register' : 'Login'}
                            </div>
                            <form onSubmit={register ? this.handleRegisterSubmit : this.handleLoginSubmit} className="Card__form">
                                <div>
                                    <span className="loginColor">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </span>
                                    <input type="text" name="ID" value={this.state.ID} onChange={this.handleChange}></input>
                                </div>
                                <div>
                                    <span className="loginColor">
                                        <FontAwesomeIcon icon={faKey} />
                                    </span>
                                    <input type="password" name="PassWord" value={this.state.PassWord} onChange={this.handleChange}></input>
                                </div>
                                <input type="submit" value={register ? 'Register' : 'Login'} className="Card__submit"></input>
                            </form>
                            <div className="urlLink">
                                {register ? <Link to='/login'>go to Login</Link> : <Link to='/register'>go to Register</Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, OwnProps) => ({
    isLoggedin: state.UserInfo.isLoggedin,
    pending: state.UserInfo.pending,
    register: OwnProps.register,
});
const mapDispatchToProps = (dispatch) => ({
    requestLogin: (userid, userPassword) => dispatch(Actions.loginRequestThunk(userid, userPassword)),
    requestRegister: (userid, userPassword) => dispatch(Actions.registerRequestThunk(userid, userPassword))
});

export { login };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(login));