import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
  kind: string;
  idToken: string;	        // A Firebase Auth ID token for the newly created user.
  email: string;	          // The email for the newly created user.
  refreshToken: string;	    // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	      // The number of seconds in which the ID token expires.
  localId: string;	        // The uid of the newly created user.
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })

export class AuthService {


  admin: boolean = false;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    if (user.email === 'koada.eduard@gmail.com') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  private hadleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists alredy';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The passwor is incorrect';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account is banned by administrator';
        break;
    };
    return throwError(errorMessage);
  }



  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsAsiqy-taZG-9KeTnFdm17KS-Lwq-4FI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.hadleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsAsiqy-taZG-9KeTnFdm17KS-Lwq-4FI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.hadleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    if (userData.email === 'koada.eduard@gmail.com') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.admin = false;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  getValue(): User | null {
    // Возвращаем текущее значение пользователя
    let userValue: User | null = null;
    this.user.subscribe(value => userValue = value).unsubscribe();
    return userValue;
  }

  getAdmin() {
    return this.admin;
  }
}