import { firestore } from 'firebase';
import { User } from './user';

export interface Note {
  userId: string;
  noteId: string;
  createdAt: firestore.Timestamp;
  updateAt: firestore.Timestamp;
  weight: string;
  bodyFatPer: string;
  trainings: Array<{
    todayMenu: string[];
    trainingWeight: string[];
    rep: string[];
  }>;
  text: string;
  movieUrl: string[];
  isPublic: boolean;
  bodyImageUrl: File;
}

export interface NoteWithUser extends Note {
  user: User;
}
