import {LOCATION_CHANGE} from 'connected-react-router';
const INITIAL_STATE = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
};

const userReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'SIGN_IN_USER':
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          displayName: payload.displayName,
          photoURL: payload.photoURL,
          uid: payload.uid,
          providerId: payload.providerData[0].providerId,
        },
      };
    case 'SIGN_OUT_USER':
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: payload.location,
      };

    default:
      return state;
  }
};

export default userReducer;
