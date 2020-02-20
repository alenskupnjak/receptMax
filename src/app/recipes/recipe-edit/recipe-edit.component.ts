import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { RecipeServise } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id: number; // index recepta
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
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingridient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingridient.name),
            amount: new FormControl(ingridient.amount)
          })
          );
        }
      }
    }
    console.log(recipeIngredients);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      nameImagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });

  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        name: new FormControl(),
        amount: new FormControl()
      })
    );
  }

}
