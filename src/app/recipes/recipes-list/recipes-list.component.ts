import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeServise} from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  listaRecepta: Recipe [] = [];
  subscription: Subscription;
  @Input() selektiraniRecept: number;
  @Input() index: number;


  constructor(private recipeService: RecipeServise,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.listaRecepta = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.listaRecepta = recipe;
        this.recipeService.listaPocetak = this.listaRecepta.length;
        this.recipeService.parznaLista.next(this.listaRecepta.length);
      }
    );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.parznaLista.next(55);
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
