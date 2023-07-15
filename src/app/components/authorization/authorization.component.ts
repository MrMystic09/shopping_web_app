import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(
    private _authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchAuthMode(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    form.reset();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObserv: Observable<AuthResponseData>;

    this.isLoading = true;


    setTimeout(() => {
      

      if (this.isLoginMode) {
        authObserv = this._authService.login(email, password);
      } else {
        authObserv = this._authService.signUp(email, password);
      }
      authObserv.subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/home'])
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
      );


    }, 300);
    form.reset();
  }
}
