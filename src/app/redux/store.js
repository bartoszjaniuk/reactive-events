import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import rootReducer from './root.reducer';
export const history = createBrowserHistory();
const middlewares = [logger, thunk];
const store = createStore(rootReducer(history), applyMiddleware(...middlewares));
export default store;
