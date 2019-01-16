import App from'../App';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/actionType';
class home extends Component {
    componentDidMount() {
        if (sessionStorage.getItem('token')) {
          this.props.checkLogin(sessionStorage.getItem('token'))
            .then(() => this.props.AppInit(this.props.UserInfoUSER, "No Title"))
            .catch((err) => { sessionStorage.removeItem('token'); alert(err);this.props.AppInit(" ","No Title");});
        } else {
          this.props.AppInit(" ","No Title");
        }
    }

    render() {
        return (
            <App {...this.props}/>
        );
    }
}

const mapStateToProps = function (state) {
    return ({
      UserInfoUSER: state.UserInfo.USER,
      isModalOpen: state.Project.Modal.isModalOpen,
      projectUserId: state.Project.userId,
      Title: state.Project.Title,
    });
  };
  
  const mapDispatchToProps = function (dispatch) {
    return ({
      AppInit: (userId, Title) => dispatch(Actions.appinit(userId, Title)),
      ProjectInit: (projectId) => dispatch(Actions.projectRequestThunk(projectId)),
      checkLogin: (token) => dispatch(Actions.checkLoginThunk(token))
    });
  };


export default connect(mapStateToProps,mapDispatchToProps)(home);