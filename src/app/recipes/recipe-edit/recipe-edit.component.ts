import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { RecipeServise } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id: number;
 editMode = false;
 recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeServise) { }

  ngOnInit() {
    this.route.params.subscribe(
      (paramas: Params) => {
        this.id = +paramas['id'];
        if (paramas['id'] == null) {
            this.editMode = false;
          } else {
            this.editMode = true;
          }
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeIagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeIagePath = recipe.imagePath;
      recipeDescription = recipe.descriprion;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      nameimagePath: new FormControl(recipeIagePath),
      descriprion: new FormControl(recipeDescription)
    });
  }

}
