import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngredientService } from '../ingredient.service';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../model/ingredient';
import { Subscription } from 'rxjs';
import { Recipe, IngredientQuantity } from '../model/recipe';
import { QT_PCS } from '../model/quantity';
import { Router } from '@angular/router';

@Component({
  selector: 'tnc-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})
export class RecipeEditorComponent implements OnInit, OnDestroy {

  private ingredients: Ingredient[];

  private ingredientSubscription : Subscription;

  private currentRecipe = new Recipe(0, "", "", "", []);
  private currentIngredient : number = 0;
  private currentIngredientQuantity : number = 0;

  constructor(private ingredientService: IngredientService, 
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.currentRecipe = new Recipe(0, "", "", "", []);

    this.ingredientSubscription = this.ingredientService.fetchIngredients()
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy() {
    this.ingredientSubscription.unsubscribe();
  }

  onAddIngredient() {
    let ingredient = this.ingredients.filter(x => x.id == this.currentIngredient).pop();
    if (!ingredient) {
      alert("Please select an ingredient!");
      return;
    }

    this.currentRecipe.ingredients.push(new IngredientQuantity(0, ingredient, this.currentIngredientQuantity));

    this.currentIngredient = 0;
    this.currentIngredientQuantity = 0;
  }

  onCreateRecipe() {
    this.recipeService.createRecipe(this.currentRecipe)
      .subscribe(recipe => {
        this.router.navigateByUrl("/recipe/" + recipe.id);
      });

    this.currentRecipe = new Recipe(0, "", "", "", []);
  }
}
