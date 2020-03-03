import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeServise } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy {
  praznaLista: string;
  brojRecepata: number;
  subscription: Subscription;
  subsBrojRecepata: Subscription;

  constructor(private recipeServis: RecipeServise) { }

  ngOnInit() {
    this.brojRecepata = this.recipeServis.listaPocetak;
    this.subsBrojRecepata = this.recipeServis.brojRecepata.subscribe(
      data => {
        this.brojRecepata = data;
      }
    );
    // console.log('brojRecepata vani==' + this.brojRecepata);
    if (this.brojRecepata == 0) {
      this.praznaLista = 'Upiši jedan recept!';
    } else {
      this.praznaLista = '*** Odaberi 1 recept ***';
    }

    this.subscription =  this.recipeServis.parznaLista.subscribe(
        (data) => {
          this.brojRecepata = data;
        });
    // this.subscription =  this.recipeServis.parznaLista.subscribe(
    //   (duljinaListe: number) => {
    //     console.log('duljina=' + duljinaListe);
    //     if (duljinaListe === 0) {
    //       this.praznaLista = '--- Upisi 1 recept ---';
    //     } else {
    //       this.praznaLista = '--- Odaberi 1 recept ---';
    //     }
    //     this.brojRecepata = duljinaListe;
    //     console.log('duljina liste=' + duljinaListe);
    //     return this.praznaLista;
    //   }
    //   );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subsBrojRecepata.unsubscribe();
  }

}
