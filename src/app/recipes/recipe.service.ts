// import { Subject } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';

import {Recipe} from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.models';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeServise {
  recipeChanged = new Subject<Recipe[]>();
  parznaLista = new Subject<number>();
  brojRecepata = new Subject<any>();
  listaPocetak: number;

  private recipes: Recipe [] = [];

 constructor(private slService: ShoppingListService ) {}

  setRecipe( recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
    this.listaPocetak = this.recipes.length;
  }


  getRecipes() {
    this.listaPocetak = this.recipes.slice().length;
    this.parznaLista.next(5);
    return this.recipes.slice();  // slice radi kopiju polja, ne dira orginalno polje
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  dodajNamirnicuShoppingListi(ingredients: Ingredient[]) {
    this.slService.addIngridients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
    this.parznaLista.next(2);
    this.listaPocetak = this.recipes.slice().length;
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
    this.parznaLista.next(1 );
    this.brojRecepata.next(this.recipes.slice().length);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
    this.listaPocetak = this.recipes.length;
    this.parznaLista.next(7);
    this.brojRecepata.next(this.recipes.slice().length);
  }

}
