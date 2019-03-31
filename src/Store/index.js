import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore,applyMiddleware,compose} from 'redux';
const store = createStore(rootReducer, applyMiddleware(thunk));
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// composeEnhancers(applyMiddleware(thunk))

export default store;