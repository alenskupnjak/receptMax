import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() aktivniMeni = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  onSelect(feature: string) {
    console.log('header.component.com - ' + feature)
    this.aktivniMeni.emit(feature);

  }

}
