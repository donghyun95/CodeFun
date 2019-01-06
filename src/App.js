import React, { Component,Fragment } from 'react';
import './App.scss';
import Header from './component/Header';
import Main from './component/Main/Main';
import Modal from './CommonComponent/Modal/Modal';
import {connect} from 'react-redux';
import Actions from './actions/actionType';
import {withRouter,Redirect,Link } from "react-router-dom"
class App extends Component {


  componentDidMount(){
    //params 로 Project 찾아온거면 해당프로젝트 userid와 title로 설정해주고 그게아니면 userinfo에서 데이터가져와서 넣어주기
    console.log(this.props.match);
    //마운트될때마다 계정연동
    const {projectId} = this.props.match.params;
    if(projectId){
      //axios요청
      if(sessionStorage.getItem('token')){
        this.props.checkLogin(sessionStorage.getItem('token')).catch((err)=>{sessionStorage.removeItem('token'); alert(err);});
      }
      this.props.ProjectInit(projectId).catch((error)=>{alert(error);this.props.history.push('/');});
    } else {
      if(sessionStorage.getItem('token')){
        this.props.checkLogin(sessionStorage.getItem('token'))
        .then(()=>this.props.AppInit(this.props.UserInfoUSER,"No Title"))
        .catch((err)=> {sessionStorage.removeItem('token'); alert(err);});
      } 
    }
    
  }

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

const mapStateToProps = function(state) {
    return ({
      UserInfoUSER : state.UserInfo.USER,
      isModalOpen: state.Project.Modal.isModalOpen,
      projectUserId: state.Project.userId,
      Title: state.Project.Title
    });  
};

const mapDispatchToProps = function(dispatch){
    return ({
      AppInit : (userId,Title)=> dispatch(Actions.appinit(userId,Title)),
      ProjectInit : (projectId) => dispatch(Actions.projectRequestThunk(projectId)),
      checkLogin: (token) => dispatch(Actions.checkLoginThunk(token))
    });
};


export default connect(mapStateToProps,mapDispatchToProps)(App);