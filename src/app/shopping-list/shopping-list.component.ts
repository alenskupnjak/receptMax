import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.models';
import { ShoppingListService } from './shopping-list.services';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient [] = [];


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged.subscribe(
      (data: Ingredient[]) => {
        console.log(data);
        this.ingredients = data;
      }
    );
  }



}
