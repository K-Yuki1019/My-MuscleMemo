import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  // createUser(user: User) {
  //   const userData: User = {
  //     uid: user.uid,
  //     userName: user.userName,
  //     avatarUrl: user.avatarUrl,
  //   };
  //   return this.db.doc<User>(`users/${user.uid}`).set(userData);
  // }

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }
}
