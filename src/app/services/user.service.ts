import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUser(uid: string): Observable<User> {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  async updateAvatar(userId: string, file: File) {
    const result = await this.storage.ref(`users/${userId}`).put(file);
    const avatarURL = await result.ref.getDownloadURL();

    this.db.doc(`users/${userId}`).update({
      avatarURL,
    });
  }

  updateUser(
    uid: string,
    userFormValue: Pick<User, 'userName' | 'gender' | 'introduction' | 'height'>
  ): Promise<void> {
    return this.db.doc<User>(`users/${uid}`).update(userFormValue);
  }
}
