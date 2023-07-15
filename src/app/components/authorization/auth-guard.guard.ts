import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
private subscription: Subscription;

  constructor(
    private router: Router, 
    private _authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const user: any = this.getAuthenticatedUser();
    const allowedEmail = 'koada.eduard@gmail.com'; 


    if (user.email === allowedEmail) {
      console.log('guard true');
      return true; 
      
    } else {
      this.router.navigate(['/home']);
      console.log('guard false');
      return false; 
      
    }



  }

  private getAuthenticatedUser() {
    // console.log(this._authService.getValue());

    this.subscription = this._authService.user.subscribe(user => {
      console.log(user);
      return user;
      
    });

    // return this._authService.user;
  }
}