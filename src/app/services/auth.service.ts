import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  afUser$: Observable<firebase.User> = this.afAuth.user;
  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser && afUser.uid;
        return this.userService.getUser(afUser.uid);
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  login() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider).then(() =>
      this.snackBar.open('ログインしました！', null, {
        duration: 2000,
      })
    );
    this.router.navigateByUrl('/');
  }

  logout() {
    this.afAuth.signOut().then(() =>
      this.snackBar.open('ログアウトしました！', null, {
        duration: 2000,
      })
    );
    this.router.navigateByUrl('/welcome');
  }
}
