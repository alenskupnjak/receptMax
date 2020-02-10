import {Ingredient} from '../shared/ingredient.models';
import { EventEmitter } from '@angular/core';


export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient [] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];



  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngridients(ingridients: Ingredient[]) {
    console.log(ingridients);
    this.ingredients.push(...ingridients);
    console.log(this.ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

}

