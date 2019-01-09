import React, { Component, Fragment } from 'react';
import './App.scss';
import Header from './component/Header';
import Main from './component/Main/Main';
import Modal from './CommonComponent/Modal/Modal';
import { connect } from 'react-redux';
import Actions from './actions/actionType';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header userId={this.props.projectUserId} Title={this.props.Title}></Header>
        <Main></Main>
        {this.props.isModalOpen && <Modal></Modal>}
      </div>
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

const withApp = function (WrappedComponent) {
  class HOC extends React.Component {
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
      return (<WrappedComponent {...this.props}></WrappedComponent>);
    }
  }
  return HOC;
}

const withProjectApp = function (WrappedComponent) {
  class Hoc extends React.Component {
    componentDidMount() {
      
      const { projectId } = this.props.match.params;

      if (sessionStorage.getItem('token')) {
        this.props.checkLogin(sessionStorage.getItem('token'))
          .catch((err) => { sessionStorage.removeItem('token'); alert(err); });
      }
      this.props.ProjectInit(projectId).catch((error) => { alert(error); this.props.history.push('/'); }); 
    }
    render() {
      return (<WrappedComponent {...this.props}></WrappedComponent>)
    }

  }
  return Hoc;
}

const Project = connect(mapStateToProps, mapDispatchToProps)(withProjectApp(App));

export default connect(mapStateToProps, mapDispatchToProps)(withApp(App));

export {Project};
