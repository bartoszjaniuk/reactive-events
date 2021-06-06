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

export const listenToUserPhotos = photos => {
  return {
    type: ProfileActionTypes.LISTEN_TO_USER_PHOTOS,
    payload: photos,
  };
};

export const listenToUserEvents = events => {
  return {
    type: ProfileActionTypes.LISTEN_TO_USER_EVENTS,
    payload: events,
  };
};
