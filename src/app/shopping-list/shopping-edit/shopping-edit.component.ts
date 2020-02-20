// import { Component, OnInit, EventEmitter, Output } from '@angular/core';   stara izvedba
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.models';
import { ShoppingListService } from '../shopping-list.services';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() namirnica = new EventEmitter<Ingredient>(); stara izvedba
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;  // dodano da bi definirali button
  editedItemIndex: number;
  namirnica: Ingredient;


  constructor(private slService: ShoppingListService,
            ) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing.
      subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.namirnica = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.namirnica.name,
          amount: this.namirnica.amount
        });
   });

  }

  onSubmit(form: FormControl) {
    const value = form.value;
    const novaNamirnica = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateJednuNamirnicu(this.editedItemIndex, novaNamirnica);
    } else {
      this.slService.addIngredient(novaNamirnica);
    }
    this.editMode = false;
    form.reset();
  }


  onClear() {
    this.slForm.reset();
    this.editMode = false;
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
