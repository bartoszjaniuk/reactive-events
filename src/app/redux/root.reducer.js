import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import eventReducer from './event/event.reducer';
import modalReducer from './modals/modal.reducer';

export default combineReducers({
  user: userReducer,
  event: eventReducer,
  modal: modalReducer,
});
