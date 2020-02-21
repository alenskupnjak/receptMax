import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServise} from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  listaRecepta: Recipe [] = [];
  @Input() selektiraniRecept: number;
  @Input() index: number;


  constructor(private recipeService: RecipeServise,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.listaRecepta = this.recipeService.getRecipes();
    this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.listaRecepta = recipe;
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipes']);
  }

}
