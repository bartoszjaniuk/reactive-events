import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root.reducer';
import { verifyAuth } from './user/user.actions';

const middlewares = [logger, thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
// store.dispatch(verifyAuth());
export default store;
