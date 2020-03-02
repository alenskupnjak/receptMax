import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spiner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule  // rijesava problem ng If a
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    DropdownDirective,
    AlertComponent
  ]

})

export class SharedModule {}