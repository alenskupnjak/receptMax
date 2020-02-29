import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from './user.model';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
 user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        console.log('U tap 1  sam i ovoj dio sluzi za vjezbu');
        const expirationDate1 = new Date();
        console.log('Trenutni datum i vrijeme: ' + expirationDate1);
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000 );
        console.log('Trenutni datum i vrijeme: ' + expirationDate);
        const userData = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        console.log(userData);
        console.log('tap Email=' + resData.email);
        resData.expiresIn = resData.expiresIn + 1;
        console.log(resData.expiresIn);
        console.log(this.user);
        // this.user.next(userData); ovim obavještavamo sve zainteresirane da se je nešto promjenilo na useru
      }), tap(resData => {
        this.handleAutentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).
      pipe(catchError(this.handleError), tap(resData => {
        this.handleAutentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      })
      );
  }


  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAutentication(email: string, userId: string, token: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn, 10) * 1000 );
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }


  private handleError( errorRes: HttpErrorResponse) {
      let errorMesage = ' Nepoznata greška';
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMesage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMesage = 'E-mail adresa već postoji!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMesage = 'E-mail nije pronađen!';
          break;
        case 'INVALID_PASSWORD':
          errorMesage = 'Krivi Password';
          break;
      }
      return throwError(errorMesage);
  }

}
