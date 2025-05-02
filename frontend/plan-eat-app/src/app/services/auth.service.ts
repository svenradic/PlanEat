import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout(){
    return this.auth.signOut()
  }

  isLoggedIn(){
    return this.auth.currentUser !== null
  }
  getUser(){
    return this.auth.currentUser
  }
  getUserName(){
    return this.auth.currentUser?.displayName
  }

  getUserId(){
    return this.auth.currentUser?.uid
  }
}
