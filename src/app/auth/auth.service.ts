import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => {
        let errorMesage = ' Nepoznata greška';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMesage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
          errorMesage = 'E-mail adresa već postoji!';
        }
        return throwError(errorMesage);
      }
      ));
  }



}