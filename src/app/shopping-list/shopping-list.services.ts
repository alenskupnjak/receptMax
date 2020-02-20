import { Subject } from 'rxjs';
import {Ingredient} from '../shared/ingredient.models';
// import { EventEmitter } from '@angular/core'; stara izvedba


export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>(); stara izvedba
  ingredientChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient [] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    // The slice() method returns the selected elements in an array, as a new array object.
    // this.ingredientChanged.emit(this.ingredients.slice()); stara izvedba
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngridients(ingridients: Ingredient[]) {
    this.ingredients.push(...ingridients);
    console.log('to=');
    console.log(this.ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice()); stara izvedba
    // The slice() method returns the selected elements in an array, as a new array object.
    this.ingredientChanged.next(this.ingredients.slice());
  }

}

