import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {Project} from './App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import rootReducer from './reducers';
import Login from './component/Login/login';
import thunk from 'redux-thunk';
let store = createStore(rootReducer,applyMiddleware(logger,thunk));
console.log(store.getState());
ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route path="/project/:projectId" component={Project}/>
            <Route path="/" exact component={App} />
            <Route path="/login" exact component={()=><Login></Login>} />
            <Route path="/register" exact render={()=><Login register={true}></Login>} />
        </Switch>
    </Router>
    
</Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
