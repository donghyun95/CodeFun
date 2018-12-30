import React, { Component,Fragment } from 'react';
import './App.scss';
import AddLibrary from './component/Header/FeatureList/AddLibrary/AddLibrary';
import DropDown from './CommonComponent/dropdown/dropdown';
import CodeEditor from './CommonComponent/codeWrite/codeWrite';
import CodeContainer from './component/Main/CodeContainer';
import Header from './component/Header';
import Main from './component/Main/Main';
import Modal from './CommonComponent/Modal/Modal';
import {connect} from 'react-redux';
import Actions from './actions/actionType';
import Save from './component/Header/FeatureList/saveNshare/sNs';
import Library from './component/Header/FeatureList/AddLibrary/AddLibrary';
import Login from './component/Header/FeatureList/Login/Login';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Main></Main>
        {this.props.isModalOpen && <Modal></Modal>}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
    return ({
      isModalOpen: state.Modal.isModalOpen
    });  
} 

const mapDispatchToProps = function(dispatch){
    return ({});
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
