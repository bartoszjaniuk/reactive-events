import firebase from '../../firebase/firebase';

export const userSignIn = user => {
  return {
    type: 'SIGN_IN_USER',
    payload: user,
  };
};

export const userSignOut = () => {
  return {
    type: 'SIGN_OUT_USER',
  };
};

export const verifyAuth = () => {
  return dispatch => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(userSignIn(user));
      } else {
        dispatch(userSignOut());
        // TEST
        // dispatch({type: 'SIGN_OUT_USER'})
      }
    });
  };
};
