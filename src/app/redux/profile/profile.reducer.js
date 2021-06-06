import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ProfileActionTypes.LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    case ProfileActionTypes.LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload,
      };
    case ProfileActionTypes.LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: payload,
      };
    case ProfileActionTypes.LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
