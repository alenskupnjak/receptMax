// import { Component, OnInit, EventEmitter, Output } from '@angular/core';   stara izvedba
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.models';
import { ShoppingListService } from '../shopping-list.services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() namirnica = new EventEmitter<Ingredient>(); stara izvedba
  subscription: Subscription;
  editMode = false;
  editedItemNumber: number;


  constructor(private slService: ShoppingListService,
            ) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing.subscribe((index: number) => {
    this.editMode = true;
    this.editedItemNumber = index;
   });

  }


  onAddItem(form: FormControl) {
    const value = form.value;
    console.log(value);
    const novaNamirnica = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(novaNamirnica);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // dodajNamirnicu(name: string, amount: number) {stara izvedba
  //   const novaNamirnica = new Ingredient(name, amount);
  //   console.log(novaNamirnica);
  //   this.shoppinglistService.addIngredient(novaNamirnica);
  // }

}
