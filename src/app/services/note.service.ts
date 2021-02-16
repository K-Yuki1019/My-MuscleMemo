import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Note, NoteWithUser } from '../interfaces/note';
import { Observable, combineLatest, of } from 'rxjs';
import { firestore } from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private db: AngularFirestore) {}

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

  // getNotesWithImagesAndPublic(userId: string) {
  //   const listRef$ = this.storage.ref(`users/${userId}`).listAll(); //userIdに基づく画像ファイルを出す
  //   const sorted: Observable<Note[]> = this.db
  //     .collection<Note>('notes', (ref) => {
  //       return ref
  //         .where('userId', '==', userId)
  //         .where('isPublic', '==', 'true')
  //         .orderBy('createdAt', 'desc')
  //         .limit(100);
  //     })
  //     .valueChanges();

  //   if (listRef$.item.length > 0) {
  //     return this.getNotesWithUsers(sorted);
  //   }
  // }

  // getAllNotesWithUsers(): Observable<NoteWithUser[]> {
  //   const sorted: Observable<NoteWithUser[]> = this.db
  //     .collection<Note>(`notes`, (ref) => {
  //       return ref.where('isPublic', '==', 'true').orderBy('createdAt', 'desc');
  //     })
  //     .valueChanges();
  //   return this.getNotesWithUsers(sorted);
  // }

  getNotesWithUsers(
    sorted: Observable<NoteWithUser[]>
  ): Observable<NoteWithUser[]> {
    let notes: NoteWithUser[];
    return sorted.pipe(
      switchMap((docs: NoteWithUser[]) => {
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
}
