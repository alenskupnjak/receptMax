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
  // verzija prva
  // @Output() aktivniMeni = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
              private authServis: AuthService) { }

  ngOnInit() {
    this.userSub = this.authServis.user.subscribe(user => {
      console.log('user se je logirao');
      console.log(user.email);
      this.isAutenticated = user ? true : false;
      console.log(this.isAutenticated);
      console.log(!user);
      console.log(!!user);
    });
  }

  // verzija prva
  // onSelect(feature: string) {
  //   console.log('header.component.com - ' + feature);
  //   this.aktivniMeni.emit(feature);
  // }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  usnimiRecepte() {
    this.dataStorageService.usnimiRecepteIzBaze();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
