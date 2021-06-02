import { ProfileActionTypes } from './profile.types';

export const listenToCurrentUserProfile = profile => {
  return {
    type: ProfileActionTypes.LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
};

export const listenToSelectedCurrentUserProfile = profile => {
  return {
    type: ProfileActionTypes.LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
};
