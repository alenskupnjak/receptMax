// verzija prva
// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // verzija prva
  // @Output() aktivniMeni = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  // verzija prva
  // onSelect(feature: string) {
  //   console.log('header.component.com - ' + feature);
  //   this.aktivniMeni.emit(feature);
  // }

}
