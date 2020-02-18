import {Recipe} from '../recipes/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.models';
import { ShoppingListService } from '../shopping-list/shopping-list.services';


@Injectable()
export class RecipeServise {
  recipeSelected = new EventEmitter<Recipe>();

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
    return this.recipes.slice();  // slice radi kopiju polja, ne dira orginalno polje
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  dodajNamirnicuShoppingListi(ingredients: Ingredient[]) {
    this.slService.addIngridients(ingredients);
  }

}
