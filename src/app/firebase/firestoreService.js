import cuid from 'cuid';
import firebase from './firebase';

const firestore = firebase.firestore();
export const dataFromSnapshot = snapshot => {
  if (!snapshot.exists) return;
  const data = snapshot.data();
  // if (data.date instanceof firebase.firestore.Timestamp) data.date = data.date.toDate();
  for (const name in data) {
    if (data.hasOwnProperty(name)) {
      if (data[name] instanceof firebase.firestore.Timestamp) {
        data[name] = data[name].toDate();
      }
    }
  }
  return {
    ...data,
    id: snapshot.id,
  };
};

// queryReference
export const listenToEventsFromFirestore = () => {
  return firestore.collection('events').orderBy('date');
};

export const listenToEventFromFirestore = eventId => {
  return firestore.collection('events').doc(eventId);
};

export const addEventToFirestore = eventToAdd => {
  return firestore.collection('events').add({
    ...eventToAdd,
    hostedBy: 'Diana',
    hostPhotoURL: 'https://randomuser.me/api/portraits/women/20.jpg',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'Diana',
      photoUrl: 'https://randomuser.me/api/portraits/women/20.jpg',
    }),
  });
};

export const updateEventInFirestore = eventToUpdate => {
  return firestore.collection('events').doc(eventToUpdate.id).update(eventToUpdate);
};

export const deleteEventFromFirestore = eventId => {
  return firestore.collection('events').doc(eventId).delete();
};

export const cancelEventToggle = event => {
  return firestore.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
};

export const setUserProfileData = user => {
  return firestore
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL || 'https://fwcdn.pl/cpo/11/41/1141/361_2.4.jpg',
    });
};
