import { Subject } from 'rxjs';
import {Ingredient} from '../shared/ingredient.models';
// import { EventEmitter } from '@angular/core'; stara izvedba


export class ShoppingListService {
  // ingredientChanged = new EventEmitter<Ingredient[]>(); stara izvedba
  namirnicaPromjenjena = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient [] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  listaSvihNamirnica() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  obrisiNamirnicu(index: number) {
      this.ingredients.splice(index, 1);
      this.namirnicaPromjenjena.next(this.ingredients.slice());
  }

  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    // The slice() method returns the selected elements in an array, as a new array object.
    // this.ingredientChanged.emit(this.ingredients.slice()); stara izvedba
    this.namirnicaPromjenjena.next(this.ingredients.slice());
  }

  addIngridients(ingridients: Ingredient[]) {
    this.ingredients.push(...ingridients);
    console.log(this.ingredients);
    // this.ingredientChanged.emit(this.ingredients.slice()); stara izvedba
    // The slice() method returns the selected elements in an array, as a new array object.
    this.namirnicaPromjenjena.next(this.ingredients.slice());
  }

  updateJednuNamirnicu(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.namirnicaPromjenjena.next(this.ingredients.slice());
  }

}

