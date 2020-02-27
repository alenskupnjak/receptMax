import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, AuthResponseData  } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})

export class AuthComponent {
isLoginMode = true;
isLoading = false;
error = null;



constructor(private authServis: AuthService) {}

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
  }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
  });


  formaPodaci.reset();
}

}