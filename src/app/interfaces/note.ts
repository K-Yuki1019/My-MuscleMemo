import { firestore } from 'firebase';
import { User } from './user';

export interface Note {
  noteId: string;
  createdAt: firestore.Timestamp;
  text: string;
  todayMenu: string;
  weight: string;
  bodyFatPer: string;
  height: string;
  movieUrl: string;
  trainingWeight: string;
  rep: string;
  userId: string;
}

export interface NoteWithUser extends Note {
  user: User;
}
