// import { Component, OnInit, EventEmitter, Output } from '@angular/core'; verzija prva
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAutenticated = false;


  constructor(private dataStorageService: DataStorageService,
              private authServis: AuthService) { }

  ngOnInit() {
    this.userSub = this.authServis.user.subscribe(user => {
      this.isAutenticated = user ? true : false;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  usnimiRecepte() {
    this.dataStorageService.usnimiRecepteIzBaze();
  }


  logOut() {
    this.authServis.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
