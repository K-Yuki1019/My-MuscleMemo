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

  createNote(noteData: Omit<Note, 'noteId' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    const note: Note = {
      noteId: id,
      createdAt: firestore.Timestamp.now(),
      text: noteData.text,
      todayMenu: noteData.todayMenu,
      bodyWeight: noteData.bodyWeight,
      bodyFatPer: noteData.bodyFatPer,
      userId: noteData.userId,
      trainingWeight: noteData.trainingWeight,
      rep: noteData.rep,
      movieUrl: noteData.movieUrl,
    };
    return this.db.doc<Note>(`notes/${id}`).set(note);
  }

  getNote(noteId: string): Observable<Note> {
    return this.db.doc<Note>(`notes/${noteId}`).valueChanges();
  }

  getNoteWithUserByNoteId(noteId: string): Observable<NoteWithUser> {
    return this.db
      .doc(`notes/${noteId}`)
      .valueChanges()
      .pipe(
        switchMap((note: Note) => {
          const user$: Observable<User> = this.db
            .doc<User>(`user/${note.userId}`)
            .valueChanges();
          return combineLatest([user$, of(note)]);
        }),
        map(([user, note]) => {
          return {
            ...note,
            user,
          };
        })
      );
  }

  getNotesWithUsers(): Observable<NoteWithUser[]> {
    let notes: Note[];
    return this.db
      .collection<Note>('notes')
      .valueChanges()
      .pipe(
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
}
