import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeServise } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
 selektiraniRecept: Recipe;
  constructor(private recipeService: RecipeServise) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selektiraniRecept = recipe;
      }
    );
  }

}
