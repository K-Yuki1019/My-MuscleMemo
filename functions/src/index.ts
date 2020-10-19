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
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });
