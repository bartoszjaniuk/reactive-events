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
export const fetchEventsFromFirestore = (predicate, limit, lastDocSnapshot = null) => {
  const user = firebase.auth().currentUser;
  let eventsRef = firestore
    .collection('events')
    .orderBy('date')
    .startAfter(lastDocSnapshot)
    .limit(2);
  switch (predicate.get('filter')) {
    case 'isGoing':
      return eventsRef
        .where('attendeeIds', 'array-contains', user.uid)
        .where('date', '>=', predicate.get('startDate'));
    case 'isHost':
      return eventsRef
        .where('hostUid', '==', user.uid)
        .where('date', '>=', predicate.get('startDate'));
    default:
      return eventsRef.where('date', '>=', predicate.get('startDate'));
  }
};

export const listenToEventFromFirestore = eventId => {
  return firestore.collection('events').doc(eventId);
};

export const addEventToFirestore = eventToAdd => {
  const user = firebase.auth().currentUser;
  return firestore.collection('events').add({
    ...eventToAdd,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeesIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export function setUserProfileData(user) {
  return firestore
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getUserProfile(userId) {
  return firestore.collection('users').doc(userId);
}

export const updateUserProfile = async profile => {
  const user = firebase.auth().currentUser;
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
      return await firestore.collection('users').doc(user.uid).update(profile);
    }
  } catch (error) {
    throw error;
  }
};

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = firestore.collection('users').doc(user.uid);
  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await firestore.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await firestore.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

export function getUserPhotos(userUid) {
  return firestore.collection('users').doc(userUid).collection('photos');
}

export const setMainPhoto = async photo => {
  const user = firebase.auth().currentUser;
  const eventDocQuery = firestore
    .collection('events')
    .where('attendeeIds', 'array-contains', user.uid);
  const userFollowerRef = firestore
    .collection('following')
    .doc(user.uid)
    .collection('userFollowing');
  const userFollowingRef = firestore
    .collection('following')
    .doc(user.uid)
    .collection('userFollowers');

  const batch = firestore.batch();

  batch.update(firestore.collection('users').doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }
      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter(attendee => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }
    const userFollowingSnap = await userFollowingRef.get();
    userFollowingSnap.docs.forEach(docRef => {
      let followingDocRef = firestore
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowing')
        .doc(user.uid);
      batch.update(followingDocRef, {photoURL: photo.url});
    });
    const userFollowerSnap = await userFollowerRef.get();
    userFollowerSnap.docs.forEach(docRef => {
      let followingDocRef = firestore
        .collection('following')
        .doc(docRef.id)
        .collection('userFollowers')
        .doc(user.uid);
      batch.update(followingDocRef, {photoURL: photo.url});
    });
    await batch.commit();

    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return firestore.collection('users').doc(userUid).collection('photos').doc(photoId).delete();
}

export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return firestore
    .collection('events')
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;
  try {
    const eventDoc = await firestore.collection('events').doc(event.id).get();
    return firestore
      .collection('events')
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc.data().attendees.filter(attendee => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

export const getUserEventsQuery = (activeTab, userUid) => {
  let eventsRef = firestore.collection('events');
  const today = new Date();
  switch (activeTab) {
    case 1: // past events
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc');
    case 2: // hosting
      return eventsRef.where('hostUid', '==', userUid).orderBy('date');
    default:
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date');
  }
};

export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = firestore.batch();
  try {
    batch.set(
      firestore.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );
    batch.update(firestore.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });
    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export async function unfollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = firestore.batch();
  try {
    batch.delete(
      firestore.collection('following').doc(user.uid).collection('userFollowing').doc(profile.id)
    );

    batch.update(firestore.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

export function getFollowersCollection(profileId) {
  return firestore.collection('following').doc(profileId).collection('userFollowers');
}

export function getFollowingCollection(profileId) {
  return firestore.collection('following').doc(profileId).collection('userFollowing');
}

export function getFollowingDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;
  return firestore
    .collection('following')
    .doc(userUid)
    .collection('userFollowing')
    .doc(profileId)
    .get();
}
