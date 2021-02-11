import { firestore } from 'firebase';
import { User } from './user';

export interface Comment {
  noteId: string;
  userId: string;
  commentId: string;
  comment: string;
  createdAt: firestore.Timestamp;
}

export interface CommentWithUser extends Comment {
  user: User;
}
