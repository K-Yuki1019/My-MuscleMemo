import { firestore } from 'firebase';

export interface User {
  uid: string;
  userName: string;
  avatarUrl: string;
  gender: 'man' | 'woman' | 'other';
  introduction: string;
  createdAt: firestore.Timestamp;
}
