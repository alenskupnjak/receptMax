import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeServise } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServise)  {}


  storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://httpmax-8a9bc.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }


  usnimiRecepteIzBaze() {
    this.http.get<Recipe[]>('https://httpmax-8a9bc.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        // Ako nema namirnica u receptu u bazi, ovdje dodajemo prazno polje
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }))
    .subscribe(recipes => {
      this.recipeService.setRecipe(recipes);
    });
  }

}
