import firebase from './firebase';
import { setUserProfileData } from './firestoreService';

export const signInWithEmail = credentials => {
  return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export const registerInFirebase = async userCredentials => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
    await result.user.updateProfile({
      displayName: userCredentials.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};

export const socialLogin = async selectedProvider => {
  let provider;

  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserPassword = creds => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword);
};
