import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError));
  }

    login(email: string, password: string) {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError));
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