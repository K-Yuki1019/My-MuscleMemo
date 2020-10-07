import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

afUser$: Observable<User> = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth
  ) {}

  login(){
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider);
  }

  logout(){
    this.afAuth.signOut();
  }
}
