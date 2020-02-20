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

  onSubmit() {
    console.log(this.recipeForm);
  }


  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      nameImagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription)
    });
  }

}
