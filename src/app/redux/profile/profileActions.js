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

export const listenToFollowers = followers => {
  return {
    type: ProfileActionTypes.LISTEN_TO_FOLLOWERS,
    payload: followers,
  };
};

export const listenToFollowings = followings => {
  return {
    type: ProfileActionTypes.LISTEN_TO_FOLLOWINGS,
    payload: followings,
  };
};

export const setFollowUser = () => {
  return {
    type: ProfileActionTypes.SET_FOLLOW_USER,
  };
};
export const setUnFollowUser = () => {
  return {
    type: ProfileActionTypes.SET_UNFOLLOW_USER,
  };
};

export const clearFollowings = () => {
  return {
    type: ProfileActionTypes.CLEAR_FOLLOWINGS,
  };
};
