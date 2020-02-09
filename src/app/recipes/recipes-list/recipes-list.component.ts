import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServise} from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe [] = [];
  rec: Recipe;

  constructor(private getRecipe: RecipeServise) { }

  ngOnInit() {
    this.recipes = this.getRecipe.getRecipes();
    this.getRecipe.recipeSelected.subscribe(
      (data: Recipe ) => {
        console.log('Pokusno');
        console.log(data);

      }
    )
  }


}
