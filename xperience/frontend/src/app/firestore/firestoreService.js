import firebase from '../config/firebase';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {

    if (!snapshot.exists) return undefined;

    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
          if (data[prop] instanceof firebase.firestore.Timestamp) {
            data[prop] = data[prop].toDate().toString();
          }
        }
      }

    return {
        ...data,
        id: snapshot.id,
    };
}

export function listenToEventsFromFirestore() {

    return db.collection('events').orderBy('date');
}

export function listenToSingleEventFromFirestore(eventID) {

  return db.collection('events').doc(eventID);
}

export function addEventToFirestore(event) {

    console.log(event);

    const user = firebase.auth().currentUser;
    console.log(user);

    return db.collection('events').add({
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/22.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            displayName: user.displayName,
            photoURL: 'https://randomuser.me/api/portraits/women/22.jpg'}),
        attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),

        });
}


export function updateEventInFirestore(event) {
  //console.log(event);
  return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
  return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled
  });
}

export function setUserProfileData(user) {
  return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}


export function addAttendee(event) {
  const user = firebase.auth().currentUser;
  return db.collection('events').doc(event.id).update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}


export async function cancelAttendee(event) {
    const user = firebase.auth().currentUser;
    try {
        const eventDoc = await db.collection('events').doc(event.id).get();
        return db.collection('events').doc(event.id).update({
            attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
            attendees: eventDoc.data().attendees.filter((attendee) => attendee.id !== user.uid),
          });
    }
    catch (error) {
      throw error;
    }
}


export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}