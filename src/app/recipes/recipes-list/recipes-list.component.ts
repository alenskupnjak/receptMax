import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServise} from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() odabraniRecept = new EventEmitter<Recipe>();
  recipes: Recipe [] = [];


  constructor(private getRecipe: RecipeServise) { }

  ngOnInit() {
    this.recipes = this.getRecipe.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.odabraniRecept.emit(recipe);
  }

}
