import React, { Component,Fragment } from 'react';
import './App.scss';
import Header from './component/Header';
import Main from './component/Main/Main';
import Modal from './CommonComponent/Modal/Modal';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount(){
    console.log('did mount');
  }


  render() {
    return (
      <div className="App">
        <Header userId={this.props.userId} Title={this.props.Title}></Header>
        <Main></Main>
        {this.props.isModalOpen && <Modal></Modal>}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
    return ({
      isModalOpen: state.Project.Modal.isModalOpen,
      userId: state.Project.userId,
      Title: state.Project.Title
    });  
} 

const mapDispatchToProps = function(dispatch){
    return ({});
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
