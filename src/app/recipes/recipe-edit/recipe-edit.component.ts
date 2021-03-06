import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeServise } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
              private recipeService: RecipeServise,
              private router: Router) { }

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
    const noviRecept = new Recipe(
      // tslint:disable-next-line:no-string-literal
      this.recipeForm.value['name'],
      // tslint:disable-next-line:no-string-literal
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
      );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, noviRecept);
    } else {
      this.recipeService.addRecipe(noviRecept);
    }

    this.onCancel();
  }


  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (const ingridient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingridient.name, Validators.required),
            amount: new FormControl(ingridient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
          );
        }
      }
    }
    console.log(recipeIngredients);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });

  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngridient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup ({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
