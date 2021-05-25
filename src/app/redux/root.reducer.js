import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';

export default combineReducers({
  user: userReducer,
  event: eventReducer,
});
