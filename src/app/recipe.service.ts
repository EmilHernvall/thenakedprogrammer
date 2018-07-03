import { Injectable } from '@angular/core';
import { Recipe, IngredientQuantity } from './model/recipe';
import { Ingredient } from './model/ingredient';
import { QT_PCS, QT_VOLUME } from './model/quantity';
import { ReplaySubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  serverUrl = "http://localhost:3000";

  private recipes: Recipe[] = [
    /*new Recipe(1, "Pannkakor", "Emils goda pannkakor",
      `Rör ihop alla ingredienser. Stek i smör eller bregott.`,
      [
        new IngredientQuantity(1, new Ingredient(1, "Ägg", QT_PCS), 3),
        new IngredientQuantity(2, new Ingredient(2, "Vatten", QT_VOLUME), 3),
        new IngredientQuantity(3, new Ingredient(3, "Mjöl", QT_VOLUME), 3),
        new IngredientQuantity(4, new Ingredient(4, "Mjölk", QT_VOLUME), 3),
        new IngredientQuantity(5, new Ingredient(5, "Salt", QT_VOLUME), 0.01),
        new IngredientQuantity(6, new Ingredient(6, "Socker", QT_VOLUME), 0.05),
      ]
    )*/
  ];

  private recipesSubject: ReplaySubject<Recipe[]> = new ReplaySubject();

  constructor(private httpClient: HttpClient, private authService: AuthService) { 

    // To use local storage:
    // let serializedRecipes = window.localStorage["recipes"];
    // this.recipes = typeof serializedRecipes !== "undefined" ? JSON.parse(serializedRecipes) : [];

    this.recipesSubject.next(this.recipes);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.serverUrl + "/recipe?token=" + this.authService.getCurrentToken());
    //return this.recipesSubject;
  }

  fetchRecipe(id): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.serverUrl + "/recipe/" + id + "?token=" + this.authService.getCurrentToken());
    //return of(this.recipes.filter(x => x.id == id).pop());
  }

  createRecipe(recipe: Recipe) : Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.serverUrl + "/recipe?token=" + this.authService.getCurrentToken(), recipe);

    //let lastId = this.recipes.map(recipe => recipe.id).pop() || 0;
    //recipe.id = lastId + 1;
    //this.recipes.push(recipe);

    //this.recipesSubject.next(this.recipes);

    //window.localStorage["recipes"] = JSON.stringify(this.recipes);

    //return recipe;
  }
}
