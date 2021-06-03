import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
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
    default:
      return state;
  }
};

export default profileReducer;
