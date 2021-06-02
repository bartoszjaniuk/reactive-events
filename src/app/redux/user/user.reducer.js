const INITIAL_STATE = {
  authenticated: false,
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
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

    default:
      return state;
  }
};

export default userReducer;
