// import { Subject } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';

import {Recipe} from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.models';
import { ShoppingListService } from '../shopping-list/shopping-list.services';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeServise {
  // recipeSelected = new Subject<Recipe>();
  // recipeSelected = new EventEmitter<Recipe>(); stara verzija
  recipeChanged = new Subject<Recipe[]>();
  parznaLista = new Subject<number>();
  listapocetak: number;


  private recipes: Recipe [] = [
    new Recipe(' Hamby', ' Mali obrok',
    'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
    [
      new Ingredient ('meat', 1),
      new Ingredient('pomfri', 3)
    ]
    ),
    new Recipe(' Big Mac', ' veliki obrok',
    'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
    [
      new Ingredient ('meso', 1),
      new Ingredient('luk', 4),
      new Ingredient('salata', 2)
    ])
  ];

 constructor(private slService: ShoppingListService ) {}

  getRecipes() {
    this.listapocetak = this.recipes.slice().length;
    this.parznaLista.next(this.recipes.slice().length);
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
    this.parznaLista.next(+this.recipes.slice().length);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
    this.parznaLista.next(+this.recipes.slice().length );
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
    this.parznaLista.next(+this.recipes.slice().length);
  }

}
