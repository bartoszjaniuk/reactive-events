import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import modalReducer from './modals/modal.reducer';
import asyncReducer from './async/async.reducer';
import profileReducer from './profile/profile.reducer';
import {connectRouter} from 'connected-react-router';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    event: eventReducer,
    modal: modalReducer,
    async: asyncReducer,
    profile: profileReducer,
  });

export default rootReducer;
