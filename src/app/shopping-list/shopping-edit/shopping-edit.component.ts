import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.models';
import { ShoppingListService } from '../shopping-list.services';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() namirnica = new EventEmitter<Ingredient>();

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
  }


  dodajNamirnicu(name: string, amount: number) {
    const novaNamirnica = new Ingredient(name, amount);
    console.log(novaNamirnica);
    this.shoppinglistService.addIngredient(novaNamirnica);
  }

  obrisiNamirnicu(name: string, amount: number) {

  }
}
