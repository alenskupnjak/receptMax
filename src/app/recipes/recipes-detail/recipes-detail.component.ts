import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServise } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {


 @Input() recipe: Recipe;

  constructor( private recipeService: RecipeServise) { }

  ngOnInit() {

  }

  dodajShoppingListi() {
    console.log(this.recipe.ingredients);
    this.recipeService.dodajNamirnicuShoppingListi(this.recipe.ingredients);
  }

}
