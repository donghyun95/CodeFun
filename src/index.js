import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {Project} from './App';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import rootReducer from './reducers';
import Login from './component/Login/login';
import UserFind from './component/userFind/userFind';
import PostedList from './component/postedList/postedList';
import thunk from 'redux-thunk';
import Forbidden from './component/ForbiddenPage/forbidden';

// 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger,thunk)));

console.log(store.getState());

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/project/:projectId" component={Project}/>
            <Route path="/login" render={()=><Login></Login>} />
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
