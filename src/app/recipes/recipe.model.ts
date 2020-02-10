import { Ingredient } from '../shared/ingredient.models';

export class Recipe {
 public name: string;
 public descriprion: string;
 public imagePath: string;
 public ingredients: Ingredient[];

constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
  this.name = name;
  this.descriprion = desc;
  this.imagePath = imagePath;
  this.ingredients = ingredients;
}

}
