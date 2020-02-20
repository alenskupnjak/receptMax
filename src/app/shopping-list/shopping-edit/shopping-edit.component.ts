// import { Component, OnInit, EventEmitter, Output } from '@angular/core';   stara izvedba
import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.models';
import { ShoppingListService } from '../shopping-list.services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // @Output() namirnica = new EventEmitter<Ingredient>(); stara izvedba

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit() {
  }


  onAddItem(form: FormControl) {
    const value = form.value;
    console.log(value);
    const novaNamirnica = new Ingredient(value.name, value.amount);
    this.shoppinglistService.addIngredient(novaNamirnica);
  }

  // dodajNamirnicu(name: string, amount: number) {stara izvedba
  //   const novaNamirnica = new Ingredient(name, amount);
  //   console.log(novaNamirnica);
  //   this.shoppinglistService.addIngredient(novaNamirnica);
  // }

}
