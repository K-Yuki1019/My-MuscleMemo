import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    const userData = {
      uid: user.uid,
      userName: user.displayName,
      avatarUrl: user.photoURL,
      gender: 'male',
      createdAt: new Date(),
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
  });
