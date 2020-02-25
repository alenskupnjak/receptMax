import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeServise } from '../recipes/recipe.service';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServise) {}
              
  storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://httpmax-8a9bc.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

}
