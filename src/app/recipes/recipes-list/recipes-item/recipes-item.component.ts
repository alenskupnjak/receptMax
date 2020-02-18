import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeServise } from '../../recipe.service'; verzija 1


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

 @Input() receptDetalj: Recipe;

  // constructor(private recipeService: RecipeServise) { } VERZIJA 1

  ngOnInit() {
  }

  // selektirano() {     VERZIJA 1
  //   this.recipeService.recipeSelected.emit(this.receptDetalj);
  // }

}
