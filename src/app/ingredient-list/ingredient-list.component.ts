import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngredientService } from '../ingredient.service';
import { Ingredient } from '../model/ingredient';
import { QuantityType, QT_PCS, QT_VOLUME, QT_WEIGHT } from '../model/quantity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tnc-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  quantityTypes: QuantityType[] = [ QT_PCS, QT_VOLUME, QT_WEIGHT ];
  ingredients: Ingredient[] = [];

  ingredientName = "";
  ingredientQuantity = "";

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.fetchIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy() {
  }

  onCreateIngredient() {
    let ingredientQuantity = this.quantityTypes.filter(qt => qt.unit == this.ingredientQuantity).pop();
    if (!ingredientQuantity) {
      alert("Please select an ingredient quantity");
      return;
    }

    let ingredient = new Ingredient(0, this.ingredientName, ingredientQuantity);
    this.ingredientService.createIngredient(ingredient)
      .subscribe(ingredient => {
        console.log("OK", ingredient);
        this.loadIngredients();
      });

    this.ingredientName = "";
    this.ingredientQuantity = "";
  }
}
