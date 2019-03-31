import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './AppContainer/home';
import Project from './AppContainer/project';
import store from './Store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from './component/Login/login';
import UserFind from './component/userFind/userFind';
import PostedList from './component/postedList/postedList';
import Forbidden from './component/ForbiddenPage/forbidden';


ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/project/:projectId" component={Project}/>
            <Route path="/login" render = {()=><Login/>}/>
            <Route path="/register"  render={()=><Login register={true}></Login>} />
            <Route path="/userFind/:userId" component={UserFind} ></Route>
            <Route path="/postedList" component={PostedList}></Route>
            <Route component={Forbidden}></Route>
        </Switch>
    </Router>
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
