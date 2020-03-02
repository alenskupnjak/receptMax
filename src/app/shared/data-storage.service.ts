import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeServise } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeServise,
              private authService: AuthService)  {}


  storeRecipes() {
      const recipes = this.recipeService.getRecipes();
      this.http.put('https://httpmax-8a9bc.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }


  usnimiRecepteIzBaze() {
    return this.http.get<Recipe[]>
        ('https://httpmax-8a9bc.firebaseio.com/recipes.json',
        ).pipe(
          map(recipes => {
            return recipes.map( recipe => {
              // Prije povlacena podataka pozivam Interceptor!
              // Ako nema namirnica u receptu u bazi, ovdje dodajemo prazno polje
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
          }), tap(recipes => {
            this.recipeService.setRecipe(recipes);
          })
          ).subscribe(response => {
            console.log(response);
          });

  }

}

