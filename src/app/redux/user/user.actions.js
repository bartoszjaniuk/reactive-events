import firebase from '../../firebase/firebase';
import { dataFromSnapshot, getUserProfile } from '../../firebase/firestoreService';
import { listenToCurrentUserProfile } from '../profile/profileActions';

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
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot(snapshot => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
        });
      } else {
        dispatch(userSignOut());
        // TEST
        // dispatch({type: 'SIGN_OUT_USER'})
      }
    });
  };
};
