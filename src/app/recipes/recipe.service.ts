import {Recipe} from '../recipes/recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeServise {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe [] = [
    new Recipe(' A test 1', ' Opis recepta 1',
    'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg'),
    new Recipe(' A test 2', ' Opis recepta 2',
    'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png'),
    new Recipe(' A test 3', ' Opis recepta 3',
    'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg'),
    new Recipe(' A test 4', ' Opis recepta 4',
    'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg')
  ];


  getRecipes() {
    // slice radi kopiju polja, ne dira orginalno polje
    return this.recipes.slice();
  }

}
