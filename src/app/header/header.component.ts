// import { Component, OnInit, EventEmitter, Output } from '@angular/core'; verzija prva
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // verzija prva
  // @Output() aktivniMeni = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
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

}
