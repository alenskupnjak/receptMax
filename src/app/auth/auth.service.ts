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
 private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {}

// prijava i registacija koorisnika u Firebase
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCi6AQgL7ObCD4Fq1kHnkirAx0xI2bnPCo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        console.log('U tap 1  sam i ovoj dio sluzi za vjezbu');
        console.log(resData);
        const expirationDate1 = new Date();
        console.log('Trenutni datum i vrijeme: ' + expirationDate1);
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000 );
        console.log('Trenutni datum i vrijeme: ' + expirationDate);
        const userData = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        console.log(userData);
        console.log(this.user);
      }), tap(resData => {
        this.handleAutentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
      })
      );
  }

  // logiranje na bazu
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

// prilokom Logouta setiramo User da ga nema, vracamo se na stranicu za registaraciju
// brise coocie userData koji je pospremljen ako je vec bio ulogiran
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  // prilokom ulogiranja, prijave ili ponove prijave odmah setiramo vrijeme
  // koliko mozemo biti prijavljeni. nakon definiranog vremena automatski se odjavljujemo
  autoLogout(expiretionDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiretionDuration);
  }

  // Ova funkcija omogucije da se ostane ulogiran nakon refresa cijele starnice
  // ako je user prethodno vec logiran, uzima podatak iz lokal storage
  autoLogin() {

    // povlacim podatke iu localStorage ako vec postoje
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date} = JSON.parse(localStorage.getItem('userData'));

    // ako nesto nije uredu sa user podacima iz localStorage izbacije iz funkcije
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date (userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      // izračinavam preostalo vrijeme koje nam je ostalo da mozemo biti logirani
      const expirationDuration =
      // definirano buduce vrijemo prilikom logiranja ili prijave
      new Date(userData._tokenExpirationDate).getTime() -
      // trenutno vrijeme
      new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  // nakon logiranja ili prijave iz podatkaka dobivenih iz Firebase kreira usera
  private handleAutentication(email: string, userId: string, token: string, expiresIn: string) {
    // izračunava vrijeme u kojem korisnik može biti logiran koji je definiran u Firebase
    // na trenutno vrijeme dodaje zaj podatak
    const expirationDate = new Date(new Date().getTime() + parseInt(expiresIn, 10) * 1000 );
    const user = new User(email, userId, token, expirationDate);

    // sprema podatke u user koji je observer
    this.user.next(user);

    // postavljamo logout vrijeme
    this.autoLogout(parseInt(expiresIn, 10) * 1000);

    // sprema korisnika lokalno
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // prilokom prijeve ili logiranja, ako izbaci grešku (catchError)
  // u ovom dijelu je obradujemo
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
