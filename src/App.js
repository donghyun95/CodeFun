import React, { Component } from 'react';
import './App.scss';
import Header from './component/Header';
import Main from './component/Main/Main';
import Modal from './CommonComponent/Modal/Modal';

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

export default App;
