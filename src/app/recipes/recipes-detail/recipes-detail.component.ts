// import { Component, OnInit, Input } from '@angular/core';  verzija jedan
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeServise } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {


//  @Input() recipe: Recipe; verzija jedan
  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeServise,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log('this.id= ' + this.id);
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  dodajShoppingListi() {
    console.log(this.recipe.ingredients);
    this.recipeService.dodajNamirnicuShoppingListi(this.recipe.ingredients);
  }

}
