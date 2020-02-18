import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id: number;
 editMode = false;
 broj: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.broj = 0;
    this.route.params.subscribe(
      (paramas: Params) => {
        this.id = +paramas['id'];

        if (paramas['id'] == null) {
            this.editMode = false;
          } else {
            this.editMode = true;
          }
        console.log('recipe-edit  - ' + this.editMode);
      }
    );
  }

}
