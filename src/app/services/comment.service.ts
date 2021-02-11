import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import {
  Comment,
  CommentWithUser,
  CommentwithUser,
} from '../interfaces/comment';
import { firestore } from 'firebase';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private db: AngularFirestore) {}

  sendComment(noteId: string, userId: string, comment: string): Promise<void> {
    const commentId = this.db.createId();
    const commentData: Comment = {
      noteId,
      userId,
      commentId,
      comment,
      createdAt: firestore.Timestamp.now(),
    };
    console.log(commentData);
    return this.db
      .doc<Comment>(`notes/${noteId}/comments/${commentId}`)
      .set(commentData);
  }

  deleteComment(noteId: string, commentId: string): Promise<void> {
    return this.db
      .doc<Comment>(`notes/${noteId}/comments/${commentId}`)
      .delete();
  }

  getAllCommentsByNoteId(noteId: string): Observable<CommentWithUser[]> {
    const sortCommentOrderByDesc = this.db
      .doc(`notes/${noteId}`)
      .collection<Comment>('comments', (ref) =>
        ref.orderBy('createdAt', 'desc').limit(20)
      )
      .valueChanges();
    return this.getAllCommentsWithUsers(sortCommentOrderByDesc);
  }

  getAllCommentsWithUsers(
    sortCommentOrderByDesc: Observable<Comment[]>
  ): Observable<CommentwithUser[]> {
    let comments: Comment[];
    return sortCommentOrderByDesc.pipe(
      switchMap((commentArray: Comment[]) => {
        comments = commentArray;

        if (comments.length) {
          const userIds: string[] = comments
            .filter((comment, index, self) => {
              return (
                self.findIndex((item) => comment.userId === item.userId) ===
                index
              );
            })
            .map((post) => post.userId);

          return combineLatest(
            userIds.map((userId) => {
              return this.db.doc(`users/${userId}`).valueChanges();
            })
          );
        } else {
          return of([null]);
        }
      }),
      map((users: User[]) => {
        return comments.map((comment) => {
          const results: CommentwithUser = {
            ...comment,
            user: users.find((user) => user.uid === comment.userId),
          };
          return results;
        });
      })
    );
  }
}
