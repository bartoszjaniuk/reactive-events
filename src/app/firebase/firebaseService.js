import firebase from './firebase';
import { setUserProfileData } from './firestoreService';

export const signInWithEmail = credentials => {
  return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export async function registerInFirebase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    await result.user.updateProfile({
      displayName: creds.displayName,
    });
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}

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
    alert(error.message);
  }
};

export const updateUserPassword = creds => {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword);
};

export const uploadToFirebaseStorage = (file, filename) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
};

export function deleteFromFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);
  return photoRef.delete();
}

export const addEventChatComment = (eventId, values) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
};

export const firebaseObjectToArray = snapshot => {
  if (snapshot) {
    return Object.entries(snapshot).map(e => Object.assign({}, e[1], { id: e[0] }));
  }
};

export const getEventChatRef = eventId => {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
};
