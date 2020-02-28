import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, AuthResponseData  } from './auth.service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    console.log('U auth-component authObs i ovo mi sluzi za vjezbu');
    console.log(resData);
    console.log('Email: ' + resData.email);
    console.log('expiredin: ' + resData.expiresIn);
    this.isLoading = false;
    this.router.navigate(['/recipes']);
  }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
  });


  // formaPodaci.reset();
}

}
