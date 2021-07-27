import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note, NoteWithUser } from '../interfaces/note';
import { Observable, combineLatest, of } from 'rxjs';
import { firestore } from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private db: AngularFirestore, private userService: UserService) {}

  createNote(
    noteData: Omit<Note, 'noteId' | 'createdAt' | 'updateAt'>
  ): Promise<void> {
    const id = this.db.createId();
    const note: Note = {
      noteId: id,
      ...noteData,
      createdAt: firestore.Timestamp.now(),
      updateAt: firestore.Timestamp.now(),
    };
    return this.db.doc<Note>(`notes/${id}`).set(note);
  }

  updateNote(
    noteId: string,
    note: Omit<Note, 'noteId' | 'createdAt' | 'updateAt'>
  ): Promise<void> {
    const updatedNote = {
      noteId,
      ...note,
      updateAt: firestore.Timestamp.now(),
    };
    return this.db.doc(`notes/${noteId}`).update(updatedNote);
  }

  getNote(noteId: string): Observable<Note> {
    return this.db.doc<Note>(`notes/${noteId}`).valueChanges();
  }

  getNotes(
    uid: string,
    lastNote?: Note
  ): Observable<{ notes: Note[]; lastNote: Note }> {
    const note$ = this.db
      .collection<Note>('notes', (ref) => {
        let query = ref
          .where('uid', '==', uid)
          .orderBy('createdAt', 'desc')
          .limit(30);
        if (lastNote) {
          query = query.startAfter(lastNote.createdAt);
        }
        return query;
      })
      .valueChanges();
    return note$.pipe(
      map((notes) => {
        return {
          notes,
          lastNote: notes[notes.length - 1],
        };
      })
    );
  }

  // 投稿IDによってNoteWithUserの投稿を取得する
  // getNoteWithUserByNoteId(noteId: string): Observable<NoteWithUser> {
  //   return this.db
  //     .doc(`notes/${noteId}`)
  //     .valueChanges()
  //     .pipe(
  //       switchMap((note: Note) => {
  //         const user$: Observable<User> = this.db
  //           .doc<User>(`users/${note.userId}`)
  //           .valueChanges();
  //         return combineLatest([user$, of(note)]);
  //       }),
  //       map(([user, note]) => {
  //         return {
  //           ...note,
  //           user,
  //         };
  //       })
  //     );

  getAllNotesWithUsers(): Observable<NoteWithUser[]> {
    const sorted: Observable<Note[]> = this.db
      .collection<Note>(`notes`, (ref) => {
        return ref
          .where('isPublic', '==', 'true')
          .orderBy('createdAt', 'desc')
          .limit(20);
      })
      .valueChanges();
    return this.getNotesWithUsers(sorted);
  }

  getNotesWithUsers(sorted: Observable<Note[]>): Observable<NoteWithUser[]> {
    let notes: Note[];
    return sorted.pipe(
      switchMap((docs: Note[]) => {
        notes = docs;
        if (notes.length) {
          const uniqueUids: string[] = notes
            .filter((note, index, array) => {
              return (
                array.findIndex((value) => value.userId === note.userId) ===
                index
              );
            })
            .map((note) => note.userId);
          return combineLatest(
            uniqueUids.map((id) => {
              return this.db.doc<User>(`users/${id}`).valueChanges();
            })
          );
        } else {
          return of([]);
        }
      }),
      map((users: User[]) => {
        return notes.map((note) => {
          const result: NoteWithUser = {
            ...note,
            user: users.find((user) => user.uid === note.userId),
          };
          return result;
        });
      })
    );
  }

  // getNotesWithUsers(sorted: Observable<Note[]>): Observable<NoteWithUser[]> {
  //   let note: Note[];
  //   return sorted.pipe(
  //     switchMap((docs: Note[]) => {
  //       if (docs?.length) {
  //         note = docs;
  //         const authorIds: string[] = docs.map((post) => post.userId);
  //         const authorUniqueIds: string[] = Array.from(new Set(authorIds));
  //         return combineLatest(
  //           authorUniqueIds.map((userId) => {
  //             return this.userService.getUser(userId);
  //           })
  //         );
  //       } else {
  //         return of([]);
  //       }
  //     }),
  //     map((users: User[]) => {
  //       if (note?.length) {
  //         return note.map((note: Note) => {
  //           const result: NoteWithUser = {
  //             ...note,
  //             user: users?.find((user: User) => user.uid === note.userId),
  //           };
  //           return result;
  //         });
  //       } else {
  //         return null;
  //       }
  //     })
  //   );
  // }
}
