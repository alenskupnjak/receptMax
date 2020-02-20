import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.models';
import { ShoppingListService } from './shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  sveNamirnice: Ingredient [] = [];
  private promjenaListe: Subscription; // svaki puta kada se mijenja nesto na listi on je aktivan


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.sveNamirnice = this.slService.listaSvihNamirnica();
    this.promjenaListe = this.slService.namirnicaPromjenjena.subscribe(
      (data: Ingredient[]) => {
        this.sveNamirnice = data;
      }
    );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.promjenaListe.unsubscribe();
  }


}
