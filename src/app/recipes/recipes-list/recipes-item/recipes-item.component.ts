import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeServise } from '../../recipe.service';


@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

 @Input() receptDetalj: Recipe;

  constructor(private recipeService: RecipeServise) { }

  ngOnInit() {
  }

  selektirano() {
    this.recipeService.recipeSelected.emit(this.receptDetalj);
  }

}
