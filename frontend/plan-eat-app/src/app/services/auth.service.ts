import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  idToken,
} from '@angular/fire/auth';
import { API_BASE_URL } from '../api.config';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  from,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private auth: Auth) {}
  private userProfile: any = null;

  async login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user.getIdToken())
      .then((idToken) => {
        return this.http
          .post<any>(
            `${API_BASE_URL}/auth/login`,
            {},
            {
              headers: { Authorization: `Bearer ${idToken}` },
            }
          )
          .toPromise()
          .then((res) => {
            this.saveToken(idToken);
            this.userProfile = res.user;
          });
      });
  }

  loginWithGoogle(): Observable<{ token: string }> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    // Step 1: Sign in with popup (Google login)
    return from(signInWithPopup(auth, provider)).pipe(
      switchMap((result) => from(result.user.getIdToken())),

      switchMap((idToken) =>
        this.http.post<{ token: string }>(`${API_BASE_URL}/auth/google-login`, {
          token: idToken,
        })
      ),

      tap((response) => {
        this.saveToken(response.token);
      })
    );
  }

  async register(
    email: string,
    password: string,
    displayName: string
  ): Promise<void> {
    try {
      // 1. Create user in backend
      await this.http
        .post(`${API_BASE_URL}/auth/register`, {
          email,
          password,
          displayName,
        })
        .toPromise();

      // 2. Log user in immediately using Firebase
      await this.login(email, password);
    } catch (err) {
      console.error('Registration error:', err);
      throw err; // rethrow if you want to handle it in component
    }
  }

  getProfile(): Observable<any> {
    if (this.userProfile) {
      return of(this.userProfile); // Return cached
    }

    const token = localStorage.getItem('token');
    if (!token) return of(null);
    return this.http
      .get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        tap((profile) => (this.userProfile = profile)),
        catchError(() => of(null))
      );
  }

  async getUserId(): Promise<string | null> {
    try {
      const profile = await firstValueFrom(this.getProfile());
      console.log('User profile:', profile);
      return profile?.uid || null;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  }

  getUserIdSync(): string | null {
    console.log(this.userProfile.uid);
    return this.userProfile?.uid || null;
  }

  async getUserName(): Promise<string | null> {
    try {
      const profile = await firstValueFrom(this.getProfile());
      console.log('User profile:', profile);
      return profile?.displayName || profile?.name || null;
    } catch (error) {
      console.error('Error fetching user name:', error);
      return null;
    }
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        this.userProfile = null;
        console.log('Logged out successfully');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
