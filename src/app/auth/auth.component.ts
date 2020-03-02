import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData  } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error = null;

  ulazniPodaci = {
  email: 'q@q.com',
  password: '123456'
  };



  constructor(private authServis: AuthService,
              private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formaPodaci: NgForm) {
    if (!formaPodaci.valid) {
       return;
    }
    const email = formaPodaci.value.email;
    const password = formaPodaci.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
    authObs = this.authServis.login(email, password);
      } else {
    authObs = this.authServis.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });


  // formaPodaci.reset();
}

onHandleError() {
 this.error = null;
}

}
