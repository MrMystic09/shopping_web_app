import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.mocel';
import { CartService } from '../home/cart/cart.service';
import { FavouritesService } from '../home/favourites/favourites.service';


export interface AuthResponseData {
  kind: string;
  idToken: string;	        // A Firebase Auth ID token for the newly created user.
  email: string;	          // The email for the newly created user.
  refreshToken: string;	    // A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	      // The number of seconds in which the ID token expires.
  localId: string;	        // The uid of the newly created user.
  registered?: boolean;
  cart: Cart[];
  favourites: Cart[];
}

@Injectable({ providedIn: 'root' })

export class AuthService {


  admin: boolean = false;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _cartService: CartService,
    private _favouritesService: FavouritesService
  ) { }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, cart: Cart[], favourites: Cart[]) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate,
      cart,
      favourites
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
            +resData.expiresIn,
            [],
            []
          );
          this._cartService.saveCartProducts(resData.localId);
          this._favouritesService.saveFavouritesProducts(resData.localId);
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
          const userData = JSON.parse(localStorage.getItem('userData'));
          const cart = userData ? userData.cart:[];
          const favourites = userData ? userData.favourites:[];
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
            cart,
            favourites
          );
          this._cartService.loadCartProducts(resData.localId);
          this._favouritesService.loadFavouritesProducts(resData.localId);
        })
      );
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      cart: Cart[];
      favourites: Cart[];
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.cart,
      userData.favourites
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this._cartService.loadCartProducts(loadedUser.id);
      this._favouritesService.loadFavouritesProducts(loadedUser.id);
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

  updateCartProducts(products: Cart[]) {
    const user = this.user.value;
    user.cart = products;
    this.user.next(user);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      userData.cart = products;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  updateFavouritesProducts(products: Cart[]) {
    const user = this.user.value;
    user.favourites = products;
    this.user.next(user);
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      userData.favourites = products;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  getUserId() {
    const userData: {
      email: string,
      id: string,
      token: string,
      tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    return userData ? userData.id : null
  }

  getValue(): User | null {
    let userValue: User | null = null;
    this.user.subscribe(value => userValue = value).unsubscribe();
    return userValue;
  }

  getAdmin() {
    return this.admin;
  }
}