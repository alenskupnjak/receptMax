import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recepti';
  usnimljeno = 'recept';


  onNavigate(data: string) {
   console.log('app.component.com - ' + data);
   this.usnimljeno = data;

  }











}
