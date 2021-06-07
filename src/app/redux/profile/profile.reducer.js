import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
  followers: [],
  followings: [],
  followingUser: false,
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
    case ProfileActionTypes.LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: payload,
      };

    case ProfileActionTypes.LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: payload,
      };

    case ProfileActionTypes.SET_FOLLOW_USER:
      return {
        ...state,
        followingUser: true,
      };

    case ProfileActionTypes.SET_UNFOLLOW_USER:
      return {
        ...state,
        followingUser: false,
      };

    case ProfileActionTypes.CLEAR_FOLLOWINGS:
      return {
        ...state,
        followers: [],
        followings: [],
      };
    default:
      return state;
  }
};

export default profileReducer;
